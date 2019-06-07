import React from 'react';
import withConditionalRendering from '../hocs/with-conditional-rendering';

/**
 * props: {
 *  show: boolean,
 *  children: any
 * }
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withConditionalRendering(Modal);
