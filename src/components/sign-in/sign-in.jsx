import React from 'react';
import {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import withFormData from '../../hocs/with-form-data/with-form-data.js';
import {Operation} from '../../reducer/user/user-action-creator.js';
import {getUser} from '../../reducer/user/selectors.js';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._submitHandler = this._submitHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const {history} = this.props;
      history.push(`/`);
    }
  }

  render() {
    const {
      onLoginChange,
      onPasswordChange
    } = this.props;

    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Хотите узнать свой результат? Представтесь!</p>
        <form
          className="login__form"
          action=""
          onSubmit = {(evt) => {
            evt.preventDefault();
            this._submitHandler();
          }}>
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              className="login__input"
              type="email"
              onChange = {onLoginChange}
              name="name"
              id="name"
              required />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              className="login__input"
              type="password"
              onChange = {onPasswordChange}
              name="password"
              id="password"
              required />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button
            className="login__button button"
            type="submit">
            Войти
          </button>
        </form>
      </section>
    );
  }

  _submitHandler() {
    const {
      login,
      formData
    } = this.props;
    const {email = ``, password = ``} = formData;
    const userData = {
      email,
      password
    };

    login(userData);
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  onLoginChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  formData: PropTypes.shape(
      {
        email: PropTypes.string,
        password: PropTypes.string
      }
  ),
  history: PropTypes.shape(
      {
        push: PropTypes.func
      }
  )
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: getUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(Operation.login(userData))
});

export {SignIn};
export default withFormData(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn)));
