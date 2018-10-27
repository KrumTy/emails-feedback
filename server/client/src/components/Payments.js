import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    const credits = this.props.auth.credits || 0;
    const hasCredits = credits > 0;

    return (
      <StripeCheckout
        name="Emails subscribtion"
        description="5$ for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">{hasCredits ? `Balance: ${credits}` : 'Add Credits'}</button>
      </StripeCheckout>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(Payments);
