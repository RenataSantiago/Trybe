import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { despesa, walletData } from '../redux/actions';

class Button extends Component {
  constructor() {
    super();

    this.state = {
      className: 'tableButtons',
      clicked: false,
    };
  }

  componentDidUpdate() {
    const { clicked } = this.state;
    if (clicked) {
      const TIME = 200;
      const timer = setInterval(() => {
        this.setState({ className: 'tableButtons', clicked: false }, () => {
          clearInterval(timer);
        });
      }, TIME);
    }
  }

  handleClick(event, bill) {
    if (event.target.name === 'Editar') this.btnEdit(bill);
    if (event.target.name === 'Excluir') this.btnDelete(bill);
    this.setState({ className: 'tableButtons clicked', clicked: true });
  }

  btnDelete = (bill) => {
    const { dispatch, expenses } = this.props;
    const arr = expenses.filter((item) => item.id !== bill);
    console.log('despesa');
    dispatch(despesa({ expenses: arr }));
  };

  btnEdit = (bill) => {
    const { dispatch } = this.props;
    dispatch(walletData({ editor: true, idToEdit: bill }));
  };

  render() {
    const { name, dataTestid, classDiv, bill } = this.props;
    const { className } = this.state;
    return (
      <div>
        <button
          data-testid={ dataTestid }
          type="button"
          onClick={ (event) => this.handleClick(event, bill) }
          name={ name }
          className={ `${className} ${classDiv}` }
        >
          { name }
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Button.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  bill: PropTypes.number.isRequired,
  classDiv: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Button);
