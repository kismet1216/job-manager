import React, { Component } from 'react';

/**
 * a HOC used to detect if user clicked out side of designated area
 * Usage:
 *        cannot use on Function Component! since https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
 *        1. addClickListener, removeClickListener must be put somewhere in your component
 *        2. must tell where is start node by using domRef prop
 *        3. need to implement handleClickOutside logic
 */
const withClickOutside = (ChildComponent) => {
  // any is any original props to child component
  return class WithClickOutside extends Component {
    childComponent; // refer to component instance in case to call its method
    startNode; // refer to component's top DOM HTML element, from where to decide if it's outside or not

    constructor(props) {
      super(props);
      this.childComponent = React.createRef();
      this.startNode = React.createRef();

      // if don't bind this, then when child component run the method, this.handleGlobalClick will be refer to undefined
      this.addListener = this.addListener.bind(this);
      this.removeListener = this.removeListener.bind(this);
      this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    // use this method to start listening
    addListener() {
      document.addEventListener('click', this.handleGlobalClick, false);
    }

    // remove it when you don't use it to prevent memory leak
    removeListener() {
      document.removeEventListener('click', this.handleGlobalClick, false);
    }

    handleGlobalClick(e) {
      // clicked part is not descendant of this component, close
      if (!this.startNode.current.contains(e.target)) {
        // child component must implement its own logic
        this.childComponent.current.handleClickOutside();
      }
    }

    render() {
      return <ChildComponent domRef={this.startNode} ref={this.childComponent} {...this.props}
                             addClickListener={this.addListener} removeClickListener={this.removeListener} />;
    }
  };
};

export default withClickOutside;
