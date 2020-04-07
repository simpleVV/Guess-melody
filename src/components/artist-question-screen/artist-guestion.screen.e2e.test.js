import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`The component interactivity`, () => {
  it(`Return correct data when user answer on question`, () => {
    const mockQuestion = {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/6/64
            /Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
      },
      answers: [
        {
          picture: `http://placehold.it/134x134`,
          artist: `John Snow`
        },
        {
          picture: `http://placehold.it/134x134`,
          artist: `Jack Daniels`
        },
        {
          picture: `http://placehold.it/134x134`,
          artist: `Jim Beam`
        },
      ]
    };

    const radioInputCheckHandler = jest.fn();
    const artistQuestionScreen = shallow(<ArtistQuestionScreen
      screenIndex = {0}
      question = {mockQuestion}
      onAnswer = {radioInputCheckHandler}
    />);

    const radioInput = artistQuestionScreen.find(`.artist__input`).first();

    radioInput.simulate(`change`, {
      target: {
        value: `John Snow`
      }
    });

    expect(radioInputCheckHandler).toHaveBeenCalledTimes(1);
    expect(radioInputCheckHandler.mock.calls[0][0]).toEqual(mockQuestion.answers[0].artist);
  });
});
