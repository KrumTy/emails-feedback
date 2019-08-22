// Lists surveys
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
// import { formFields } from './config';
// import { withRouter } from 'react-router-dom';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(s => (
      <div className="card darken-1" key={s._id}>
        <div className="card-content">
          <span className="card-title">{s.title}</span>
          <p>{s.body}</p>
          <p className="right">Sent On: {new Date(s.sentOn || Date.now()).toLocaleDateString()}</p>
        </div>
        <div className="card-action">
          <a>Yes: {s.yes}</a>
          <a>No: {s.no}</a>
        </div>
      </div>
    ));
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
