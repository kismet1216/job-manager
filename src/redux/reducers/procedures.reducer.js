import { PROCEDURE_ADD } from '../../constants';

const proceduresReducer = (state = [], action) => {
  switch (action.type) {
    case PROCEDURE_ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}

export default proceduresReducer;
