import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe(`The component is rendered correctly`, () => {
  it(`App correctly render after relaunch`, () =>{
    const appComponent = renderer
      .create(<App
        gameTime = {7}
        errorCount = {4}
      />)
      .toJSON();

    expect(appComponent).toMatchSnapshot();
  });
});
