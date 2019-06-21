import { PROCEDURE_SET } from '../../constants';

export function setProcedureAction(newProcedure) {
  return {type: PROCEDURE_SET, payload: newProcedure};
}
