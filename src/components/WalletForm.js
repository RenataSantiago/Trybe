import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { despesa, walletData, walletDataThunk } from '../redux/actions';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    toEdit: false,
    className: 'walletButton',
    clicked: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(walletDataThunk());
  }

  componentDidUpdate() {
    const { dispatch, editor } = this.props;
    const { clicked } = this.state;
    if (editor) {
      this.setState({ toEdit: true });
      dispatch(walletData({ editor: false }));
      this.editXablau();
    }
    if (clicked) {
      const TIME = 200;
      const timer = setInterval(() => {
        this.setState({ className: 'walletButton', clicked: false }, () => {
          clearInterval(timer);
        });
      }, TIME);
    }
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
    this.setState({
      value: '', description: '', clicked: true, className: 'walletButton clicked' });
    dispatch(despesa({ expenses: arr }));
    dispatch(walletDataThunk());
  };

  handleEdit = () => {
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses, exchangeRates, idToEdit } = this.props;
    const arr1 = expenses.filter((item) => item.id !== idToEdit);
    const arr2 = [...arr1, {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      id: idToEdit,
    }];
    // arr2.sort((a, b) => ((a.id < b.id) ? 1 : -1));
    const array = [...arr2];
    arr2.forEach((element, i) => {
      array[i] = arr2.find((e) => i === e.id);
    });
    this.setState({
      value: '',
      description: '',
      toEdit: false,
      clicked: true,
      className: 'walletButton clicked' });
    dispatch(despesa({ expenses: array }));
  };

  editXablau() {
    const { expenses, idToEdit } = this.props;
    const despesaXablau = expenses.find((x) => x.id === idToEdit);
    const { value, currency, method, tag, description } = despesaXablau;
    this.setState({
      value,
      currency,
      method,
      tag,
      description,
    });
  }

  render() {
    const { value, currency, method, tag, description, toEdit, className } = this.state;
    const { currencies } = this.props;
    return (
      <div className="walletDiv">
        <label htmlFor="valor" className="walletLabel">
          Valor:
          <input
            className="walletInputs"
            id="valor"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description" className="walletLabel">
          Descrição:
          <input
            id="description"
            className="walletInputs"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          className="walletSelects"
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
          className="walletSelects"
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
          className="walletSelects"
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
          className={ className }
          type="button"
          onClick={ !toEdit ? this.handleClick : this.handleEdit }
        >
          { !toEdit ? 'Adicionar despesa' : 'Editar despesa'}
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
  exchangeRates: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
