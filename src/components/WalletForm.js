import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { despesa, walletDataThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletDataThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses, exchangeRates } = this.props;
    const expensesID = expenses.length;
    const arr = [...expenses, {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      id: expensesID,
    }];
    this.setState({ value: '', description: '' });
    dispatch(despesa({ expenses: arr }));
    dispatch(walletDataThunk());
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((option, i) => (
            <option key={ i }>{option}</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    editor: state.wallet.editor,
    idToEdit: state.wallet.idToEdit,
    exchangeRates: state.wallet.exchangeRates,
  };
}

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
