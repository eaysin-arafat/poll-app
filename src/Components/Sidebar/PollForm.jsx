import React from "react";
import Form from "./Form";
import PropTypes from "prop-types";
import shortid from "shortid";

const defaultOptions = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];

class PollForm extends React.Component {
  state = {
    title: "",
    description: "",
    options: defaultOptions,
    errors: {},
  };

  componentDidMount() {
    const { polls } = this.props;
    if (polls && Object.keys(polls).length > 0) {
      this.setState({
        title: polls.title,
        description: polls.description,
        options: polls.options,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOptionChange = (event, index) => {
    const { options } = this.state;
    options[index].value = event.target.value;
    this.setState({ options });
  };

  createOption = () => {
    const { options } = this.state;
    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      this.setState({ options });
    } else {
      alert("You can create max 5 Options");
    }
  };

  deleteOption = (index) => {
    const { options } = this.state;
    if (options.length > 2) {
      options.splice(index, 1);
      this.setState({ options });
    } else {
      alert("You must have at least TWO options");
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = this.validate();

    if (isValid) {
      const { title, description, options } = this.state;
      const poll = {
        title,
        description,
        options,
      };

      if (this.props.isUpdate) {
        poll.id = this.props.polls.id;
        this.props.submit(poll);
        alert("Updated Successfully");
      } else {
        this.props.submit(poll);
        this.setState({
          title: "",
          description: "",
          options: defaultOptions,
          errors: {},
        });
      }
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};
    const { title, description, options } = this.state;

    if (!title) {
      errors.title = "Please Provide A Title";
    } else if (title.length < 20) {
      errors.title = "Tittle Too Short";
    } else if (title.length > 100) {
      errors.title = "Tittle Too Long";
    }

    if (!description) {
      errors.description = "Please Provide A Description";
    } else if (description.length > 500) {
      errors.description = "Description Too Long";
    }

    const optionErrors = [];
    options.forEach((opt, index) => {
      if (!opt.value) {
        optionErrors[index] = "Option Text Empty";
      } else if (opt.value.length > 100) {
        optionErrors[index] = "Option Text Too Long";
      }
    });

    if (optionErrors.length > 0) {
      errors.options = optionErrors;
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    const { title, description, options, errors } = this.state;

    return (
      <Form
        title={title}
        description={description}
        options={options}
        buttonValue={this.props.buttonValue || "Create Poll"}
        errors={errors}
        handleChange={this.handleChange}
        handleOptionChange={this.handleOptionChange}
        createOption={this.createOption}
        deleteOption={this.deleteOption}
        handleSubmit={this.handleSubmit}
        setState={this.setState}
      />
    );
  }
}

PollForm.propTypes = {
  submit: PropTypes.func.isRequired,
  buttonValue: PropTypes.string,
  polls: PropTypes.object,
};

export default PollForm;
