import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { despesa, walletData } from '../redux/actions';

class Table extends Component {
  btnDelete = (e) => {
    const { dispatch, expenses } = this.props;
    const arr = expenses.filter((item) => item.id !== e.id);
    dispatch(despesa({ expenses: arr }));
  };

  btnEdit = (e) => {
    const { dispatch } = this.props;
    dispatch(walletData({ editor: true, idToEdit: e.id }));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.currency}</td>
                <td>{Number((e.exchangeRates[e.currency].ask)).toFixed(2)}</td>
                <td>{Number((e.exchangeRates[e.currency].ask) * e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.btnDelete(e) }
                  >
                    Delete
                  </button>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.btnEdit(e) }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    // editor: state.wallet.editor,
    //   idToEdit: state.wallet.idToEdit,
    exchangeRates: state.wallet.exchangeRates,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
