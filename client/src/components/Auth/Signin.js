import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { compose } from 'redux';
import { renderField } from 'utils/renderField';

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/home');
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="ui form container segment">
          <div className="field">
            <label>Email</label>
            <Field name="email" type="text" component={renderField} />
          </div>
          <div className="field">
            <label>Password</label>
            <Field name="password" type="password" component={renderField} />
          </div>
          <button className="ui button">Log in</button>
          {this.props.errorMessage && (
            <div className="ui red basic label">{this.props.errorMessage}</div>
          )}
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  const fields = ['email', 'password'];
  fields.forEach(field => {
    if (!values[field]) errors[field] = `Please enter a ${field}`;
  });

  return errors;
};

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'signin', validate })
)(Signin);
