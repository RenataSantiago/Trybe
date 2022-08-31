import { DESPESA, WALLETDATA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  despesaTotal: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLETDATA: {
    return {
      ...state,
      ...action.obj,
    };
  }
  case DESPESA: {
    return {
      ...state,
      ...action.objDespesa,
    };
  }
  default: return state;
  }
};

export default wallet;
