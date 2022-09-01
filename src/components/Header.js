import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, despesaTotal } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ despesaTotal.toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
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
