import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    despesasTotal: 0,
  };

  render() {
    const { email } = this.props;
    const { despesasTotal } = this.state;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{ despesasTotal }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email });

export default connect(mapStateToProps)(Header);
