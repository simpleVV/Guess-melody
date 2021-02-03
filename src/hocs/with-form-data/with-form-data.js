import React from 'react';
import {PureComponent} from 'react';

const withFormData = (Component) => {
  class WithFormData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        formData: {}
      };

      this._loginChangeHandler = this._loginChangeHandler.bind(this);
      this._passwordChangeHandler = this._passwordChangeHandler.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          formData = {this.state.formData}
          onLoginChange = {this._loginChangeHandler}
          onPasswordChange = {this._passwordChangeHandler}
        />
      );
    }

    _loginChangeHandler(evt) {
      const {formData} = this.state;

      this.setState({
        formData: Object.assign({}, formData, {email: evt.target.value})
      });
    }

    _passwordChangeHandler(evt) {
      const {formData} = this.state;

      this.setState({
        formData: Object.assign({}, formData, {password: evt.target.value})
      });
    }
  }

  return WithFormData;
};

export default withFormData;
