import React from 'react';
import withConditionalRendering from '../hocs/with-conditional-rendering';
import './modal.scss';

/**
 * props: {
 *  show: boolean,
 *  title: string,
 *  onClose: () => {},
 *  children: any
 * }
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.close = this.close.bind(this);
    this.onClickBackground = this.onClickBackground.bind(this);
  }

  close() {
    this.props.onClose();
  }

  onClickBackground(event) {
    // if clicked elm is 'cover' itself, do close, otherwise ignore
    if(event.target === event.currentTarget) {
      this.close();
    }
  }

  render() {
    return (
      <div className="cover" onClick={this.onClickBackground}>
        <div className="modal-container rounded">
          <div className="d-flex justify-content-between">
            {this.props.title}
            <span onClick={this.close}>&times;</span>
          </div>
          <div className="p-1">
            {this.props.children}
          </div>
          <div className="">
          </div>
        </div>
      </div>
    );
  }
}

export default withConditionalRendering(Modal);
