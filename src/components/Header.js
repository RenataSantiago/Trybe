import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, despesaTotal } = this.props;
    return (
      <div className="header">
        <div className="userDiv">
          <span data-testid="email-field" className="user">{email}</span>
          <Link to="/">
            <button
              type="button"
              className="exitButton"
            >
              SAIR
            </button>
          </Link>
        </div>
        <div className="currencyDiv">
          <span id="qtd" data-testid="total-field">{despesaTotal.toFixed(2)}</span>
          <span id="currency" data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesaTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesaTotal: state.wallet.despesaTotal,
});

export default connect(mapStateToProps)(Header);
