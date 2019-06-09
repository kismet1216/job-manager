import React from 'react';
import Popover from '../../../shared/popover/popover';

export default class ProcedureMenu extends React.Component {
  render() {
    return (
      <Popover width="200px" trigger={<button className="btn btn-link"><i className="fa fa-bars" /></button>}>
        <div className="list-group list-group-flush">
          <button className="list-group-item list-group-item-action">左移</button>
          <button className="list-group-item list-group-item-action">右移</button>
          <button className="list-group-item list-group-item-action">时间先后排序</button>
          <button className="list-group-item list-group-item-action">时间先后逆序</button>
          <button className="list-group-item list-group-item-action">优先级排序</button>
          <button className="list-group-item list-group-item-action list-group-item-danger">清空</button>
        </div>
      </Popover>
    );
  }
}
