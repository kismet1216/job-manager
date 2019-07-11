import React from 'react';
import Procedure from './procedure';
import renderer from 'react-test-renderer';
import Popover from '../../../shared/components/popover/popover';
import store from '../../../redux/store';
import { Provider } from 'react-redux';

describe('Procedure', () => {
  const info = {id: 1, title: '1'};

  it('has a valid menu snapshot', () => {
    const testRenderer = renderer.create(<Provider store={store}><Procedure info={info} /></Provider>);
    const testInstance = testRenderer.root;
    let tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();

    // trigger click
    testInstance.findByType(Popover).findByProps({className: 'trigger'}).props.onClick();
    tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
