import React from 'react';
import Popover from '../../../shared/popover/popover';

export default class ProcedureMenu extends React.Component {
  render() {
    return (
      <Popover trigger={<button className="btn btn-link"><i className="fa fa-bars" /></button>}>
        'g'
      </Popover>
    );
  }
}
