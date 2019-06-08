import React from 'react';

export default function (WrappedComponent) {
  return function ({show, ...props}) {
    return show ? <WrappedComponent {...props} /> : null;
  }
}
