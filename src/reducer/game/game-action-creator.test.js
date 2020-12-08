import {ActionType} from './game.js';

import {
  GameActionCreator,
  isGenreAnswerCorrect,
  isArtistAnswerCorrect,
} from './game-action-creator.js';

describe(`Business logic is correct`, () => {
  it(`Genre answer is checked correctly`, () => {
    const mockQuestion = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `rock`
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `pop`
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `jazz`
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
          genre: `rock`
        }
      ]
    };

    expect(isGenreAnswerCorrect([true, false, false, true], mockQuestion)).toEqual(true);
    expect(isGenreAnswerCorrect([false, false, true, true], mockQuestion)).toEqual(false);
  });
  it(`Artist answer is checked correctly`, () => {
    const mockQuestion = {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
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

    expect(isArtistAnswerCorrect({
      artist: `Jim Beam`
    }, mockQuestion)).toEqual(true);
    expect(isArtistAnswerCorrect({
      artist: `John Snow`
    }, mockQuestion)).toEqual(false);
  });
});

describe(`Action creator work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(GameActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1
    });
  });

  it(`Action creator for incrementing mistake return action with 0 payload`, () => {
    const mockUserAnswers = [false, true, false, false];
    const mockQuestion = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `pop`,
          src: ``
        },
        {
          genre: `rock`,
          scr: ``
        }
      ]
    };

    expect(GameActionCreator.incrementMistake(mockUserAnswers, mockQuestion, 0, 3))
    .toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0
    });
  });

  it(`Action creator for incrementing mistake return action with 1 payload`, () => {
    const mockUserAnswers = [true, true, false, false];
    const mockQuestion = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `pop`,
          scr: ``
        }
      ]
    };

    expect(GameActionCreator.incrementMistake(mockUserAnswers, mockQuestion, 0, 3))
    .toEqual({
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1
    });
  });

  it(`Action creator resets state if user is answered incorrectly and number of mistakes equally max mistakes number`, () => {
    const mockUserAnswers = [false, false, false, true];
    const mockQuestion = {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `pop`,
          scr: ``
        }
      ]
    };

    expect(GameActionCreator.incrementMistake(mockUserAnswers, mockQuestion, 2, 2))
    .toEqual({
      type: ActionType.RESET
    });
  });

  it(`Action creator decrement time return action with 1000 payload`, () => {
    expect(GameActionCreator.decrementTime(10000)).toEqual({
      type: ActionType.DECREMENT_TIME,
      payload: 1000
    });
  });

  it(`Action creator correctly reset state`, () => {
    expect(GameActionCreator.reset())
     .toEqual({
       type: ActionType.RESET
     });
  });
});
