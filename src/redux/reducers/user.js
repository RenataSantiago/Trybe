import { USERDATA } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USERDATA: {
    return {
      ...state,
      ...action.obj,
    };
  }
  default: return state;
  }
};

export default user;
