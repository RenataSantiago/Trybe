export const USERDATA = 'USERDATA';
export const WALLETDATA = 'WALLETDATA';
export const DESPESA = 'DESPESA';

export const userData = (obj) => ({
  type: USERDATA,
  obj,
});

export const walletData = (obj) => ({
  type: WALLETDATA,
  obj,
});

export const walletDataThunk = () => async (dispatch) => {
  const API_URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(API_URL);
  const crr = await response.json();
  const currencies = Object.keys(crr).filter((item) => item !== 'USDT');
  dispatch(walletData({ currencies, exchangeRates: crr }));
};

export const despesa = (objDespesa) => {
  const despesaArray = objDespesa.expenses
    .map((e) => Number(e.value) * Number(e.exchangeRates[e.currency].ask));
  const despesaTotal = despesaArray.reduce((soma, atual) => (atual + soma), 0);
  const array = [...objDespesa.expenses];
  objDespesa.expenses.forEach((element, index) => {
    array[index] = objDespesa.expenses.find((e) => e.id === index);
  });
  objDespesa = { ...objDespesa, expenses: array };
  return {
    type: DESPESA,
    objDespesa: { ...objDespesa, despesaTotal },
  };
};
