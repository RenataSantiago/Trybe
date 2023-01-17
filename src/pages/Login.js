import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userData } from '../redux/actions';
import '../styles/App.css';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonIsDisabled: true,
    className: 'loginButton disabled',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      this.handleButton,
    );
  };

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userData({ email }));
    history.push('/carteira');
  };

  handleButton = () => {
    const { email, password } = this.state;
    const six = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= six) {
      this.setState({ buttonIsDisabled: false, className: 'loginButton' });
    } else {
      this.setState({ buttonIsDisabled: true, className: 'loginButton disabled' });
    }
  };

  render() {
    const { email, password, buttonIsDisabled, className } = this.state;
    return (
      <form
        className="login"
      >
        <div
          className="loginForm"
        >
          <h1>Trybe Wallet</h1>
          <label htmlFor="email" className="loginLabel">
            Email
            <input
              id="email"
              className="loginInputs"
              data-testid="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <br />
          <label htmlFor="senha" className="loginLabel">
            Senha
            <input
              id="senha"
              className="loginInputs"
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            className={ className }
            type="submit"
            disabled={ buttonIsDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
