import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userData } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonIsDisabled: true,
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
    history.push('/carteira');
    dispatch(userData({ email }));
  };

  handleButton = () => {
    const { email, password } = this.state;
    const six = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= six) {
      this.setState({ buttonIsDisabled: false });
    } else {
      this.setState({ buttonIsDisabled: true });
    }
  };

  render() {
    const { email, password, buttonIsDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ buttonIsDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
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
