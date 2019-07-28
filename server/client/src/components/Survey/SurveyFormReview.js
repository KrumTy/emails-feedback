import React from 'react';
import { connect } from 'react-redux';
import { formFields } from './config';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = props => (
  <div>
    <h5>Please confirm your entries</h5>
    <div>{props.formValues.title}</div>
    {formFields.map(({ name, label }, index) => (
      <div key={name + index}>
        <label>{label}</label>
        <div>{props.formValues[name]}</div>
      </div>
    ))}
    <button className="yellow darken-3 btn-flat white-text" onClick={props.onCancel}>
      Back
    </button>
    <button type="submit" className="green btn-flat right white-text" onClick={() => props.submitSurvey(props.formValues, props.history)}>
      Send Survey
      <i className="material-icons right">email</i>
    </button>
  </div>
);

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
