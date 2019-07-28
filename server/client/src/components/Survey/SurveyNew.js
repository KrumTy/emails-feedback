// shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);
  //   this.showFormReview = false;
  // }
  // same as above^
  state = { showFormReview: false };

  renderContent() {
    return this.state.showFormReview ? (
      <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
    ) : (
      <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return (
      <div>
        <h2>New Survey</h2>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
