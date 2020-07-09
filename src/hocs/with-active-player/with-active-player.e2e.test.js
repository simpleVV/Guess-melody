import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActivePlayer from './with-active-player.js';

Enzyme.configure({adapter: new Adapter()});

describe(`The component interactivity`, () => {
  it(`Paused by defautl`, () => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withActivePlayer(MockComponent);

    const mockComponentWrapped = shallow(<MockComponentWrapped/>);

    expect(mockComponentWrapped.state().activePlayer).toEqual(-1);
  });
});
