import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";

const MyForm = ({
  title,
  description,
  options,
  errors,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
  handleSubmit,
  setState,
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input
        name="title"
        id="title"
        placeholder="A Dummy Title"
        value={title}
        onChange={handleChange}
        // invalid={errors.title ? true : false}
      />
      {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
    </FormGroup>

    <FormGroup>
      <Label for="title">Description</Label>
      <Input
        name="description"
        id="description"
        placeholder="Description Your Poll"
        value={description}
        onChange={handleChange}
        // invalid={errors.description ? true : false}
      />
      {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
    </FormGroup>

    <FormGroup>
      <Label>
        Enter Options
        <span
          style={{
            marginLeft: "30px",
            background: "green",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={createOption}
        >
          Add Option
        </span>
      </Label>
      {options.map((opt, index) => (
        <div key={opt.id} className="d=flex, my-2">
          <input
            value={opt.value}
            onChange={(e) => handleOptionChange(e, index)}
            // invalid={errors.options && errors.options[index] ? true : false}
          />
          <Button
            color="danger"
            disabled={options.length <= 2}
            className="ml-2"
            onClick={() => deleteOption(index)}
          >
            Delete
          </Button>
        </div>
      ))}
    </FormGroup>
    <Button color="primary" type="submit">
      {buttonValue}
    </Button>
  </Form>
);

MyForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array,
  errors: PropTypes.object.isRequired,
  buttonValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  createOption: PropTypes.func.isRequired,
  deleteOption: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MyForm;
