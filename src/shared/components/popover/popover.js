import React from 'react';
import './popover.scss';
import withClickOutside from '../../hocs/with-click-outside';

/**
 * use Hook
 * props: {
 *   width?: string = 240px
 *   trigger: any,
 *   children: any
 * }
 * domRef, addClickListener, removeClickListener are given by withClickOutside HOC
 * */
class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    };

    this.toggleStatus = this.toggleStatus.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  // used by withClickOutside HOC
  handleClickOutside() {
    this.toggleStatus();
  }

  toggleStatus() {
    // add or remove listener
    if (this.state.opened) {
      this.props.addClickListener();
    } else {
      this.props.removeClickListener();
    }

    this.setState(prev => {
      if (prev.opened) {
        this.props.removeClickListener();
      } else {
        this.props.addClickListener();
      }
      return {opened: !prev.opened};
    });
  }

  render() {
    return (
      <div className="popover-component" ref={this.props.domRef}>
        <div onClick={this.toggleStatus}>{this.props.trigger}</div>
        {this.state.opened ?
          <div className="popover-content border rounded" style={{width: this.props.width}}>
            {React.cloneElement(this.props.children, {close: this.toggleStatus})}
          </div> : null}
      </div>
    );
  }
}

export default withClickOutside(Popover);
