import React from 'react';
import {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  ActionCreator,
  Operation
} from '../../reducer/action-creator.js';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    this._onSubmitHandler = this._onSubmitHandler.bind(this);
  }

  render() {
    const {onReset} = this.props;

    return (
      <section className="login">
        <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__text">Представтесь!</p>
        <form
          className="login__form"
          action=""
          onSubmit = {(evt) => {
            evt.preventDefault();
            this._onSubmitHandler();
          }}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              className="login__input"
              type="email"
              name="name"
              id="name"
              ref = {this._loginRef}
              required
            />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              ref = {this._passwordRef}
              required
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button
            className="login__button button"
            type="submit"
          >
            Войти
          </button>
        </form>
        <button
          className="replay"
          type="button"
          onClick = {onReset}
        >
            Сыграть ещё раз
        </button>
      </section>
    );
  }

  _onSubmitHandler() {
    const {
      login
    } = this.props;

    const userData = {
      email: this._loginRef.current.value,
      password: this._passwordRef.current.value
    };

    login(userData);
  }
}

AuthorizationScreen.propTypes = {
  onReset: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {});

const mapDispatchToProps = (dispatch) => ({
  onReset: () => dispatch(ActionCreator.reset()),
  login: (userData) => dispatch(Operation.login(userData))
});

export {AuthorizationScreen};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen);
