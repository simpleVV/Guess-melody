import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withFormData from './with-form-data.js';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div></div>;
const MockComponentWrapped = withFormData(MockComponent);

const mockEmailInput = {
  target: {
    value: `test@mail.ru`
  }
};
const mockPasswordInput = {
  target: {
    value: `testpass`
  }
};

describe(`HOC works correctly`, () => {
  it(`Should change formData property in state`, () => {
    const mockComponentWrapped = shallow(
        <MockComponentWrapped
          onLoginChange = {jest.fn()}
          onPasswordChange = {jest.fn()}
        />
    );

    expect(mockComponentWrapped.props().formData).toEqual({});

    mockComponentWrapped.props().onLoginChange(mockEmailInput);

    expect(mockComponentWrapped.props().formData).toEqual({
      email: `test@mail.ru`
    });

    mockComponentWrapped.props().onPasswordChange(mockPasswordInput);

    expect(mockComponentWrapped.props().formData).toEqual({
      email: `test@mail.ru`,
      password: `testpass`
    });
  });
});
