import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";

class ParticipateForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors, isValid } = this.validate();

    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.polls.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });
      event.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.name) {
      errors.name = "Please Provide A Name";
    } else if (this.state.name.length > 20) {
      errors.name = "Name Too long";
    }

    if (!this.state.selectedOption) {
      errors.selectedOption = "Please Select One Option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex justify-content-between">
          <h4>Options</h4>

          <div className="">
            <Button
              color="warning"
              type="button"
              onClick={this.props.toggleModal}
            >
              Edit
            </Button>
            <Button
              className="ml-2"
              color="danger"
              type="button"
              onClick={() => this.props.deletePoll(this.props.polls.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        {this.props.polls.options.map((opt) => (
          <FormGroup className="my-2" key={opt.id}>
            <Label className="w-100">
              <div className="d-flex justify-content-between">
                <div>
                  <Input
                    type="radio"
                    id={opt.id}
                    name="selectedOption"
                    value={opt.id}
                    onChange={this.handleChange}
                    // isValid={this.state.errors.selectedOption ? true : false}
                  />
                  {opt.value}
                </div>
                <div>
                  <span
                    style={{
                      padding: "5px 20px",
                      background: "green",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    className="ml-auto"
                  >
                    {opt.vote}
                  </span>

                  <span
                    style={{
                      padding: "5px 20px",
                      background: "orange",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    {this.props.polls.totalVote > 0
                      ? ((100 * opt.vote) / this.props.polls.totalVote).toFixed(
                          2
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </Label>
          </FormGroup>
        ))}
        <FormGroup className="my-3">
          <Label>Enter Your Name</Label>
          <Input
            name="name"
            placeholder="Eaysin Arafat"
            value={this.state.value}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button type="submit" color="primary">
          Submit Your Options
        </Button>
      </Form>
    );
  }
}

ParticipateForm.propTypes = {
  polls: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  getOpinion: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
};

export default ParticipateForm;
