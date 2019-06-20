import React from 'react';
import withConditionalRendering from '../../hocs/with-conditional-rendering';
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

    this.close = this.close.bind(this);
    this.onClickBackground = this.onClickBackground.bind(this);
  }

  close() {
    this.props.onClose();
  }

  onClickBackground(event) {
    // if clicked elm is 'cover' itself, do close, otherwise ignore
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  render() {
    return (
      <div className="cover" onClick={this.onClickBackground}>
        <div className="modal-container rounded p-2">
          <div className="d-flex justify-content-between border-bottom mb-4">
            <h4>{this.props.title}</h4>
            <h4 onClick={this.close}>&times;</h4>
          </div>
          <div className="">
            {React.cloneElement(this.props.children, {onClose: this.close})}
          </div>
          <div className="">
          </div>
        </div>
      </div>
    );
  }
}

export default withConditionalRendering(Modal);
