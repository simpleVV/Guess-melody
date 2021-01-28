import React from 'react';
import {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/user/user-action-creator.js';
import {getUser} from '../../reducer/user/selectors.js';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    this._submitHandler = this._submitHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const {history} = this.props;
      history.push(`/`);
    }
  }

  render() {
    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
        <p className="login__text">Представтесь!</p>
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
              name="name"
              id="name"
              ref = {this._loginRef}
              required />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              ref = {this._passwordRef}
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
    const {login} = this.props;
    const userData = {
      email: this._loginRef.current.value,
      password: this._passwordRef.current.value
    };

    login(userData);
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
