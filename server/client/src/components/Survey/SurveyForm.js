// shows SurveyField
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmail from '../../utils/validateEmail';
import { formFields } from './config';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }, index) => <Field key={name + index} label={label} type="text" name={name} component={SurveyField} />);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  formFields.forEach(({ label, name, isRequired }) => {
    if (isRequired && !values[name]) {
      errors[name] = `You must provide a ${label}`;
    }
  });

  if (!errors.recipients) {
    errors.recipients = validateEmail(values.recipients);
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
