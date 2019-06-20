import { PROCEDURE_SET } from '../../constants';

export const doCardAction = (procedure) => {
  return {type: PROCEDURE_SET, payload: procedure};
};
