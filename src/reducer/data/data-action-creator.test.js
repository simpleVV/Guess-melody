import createAPI from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import {ActionType} from './data.js';
import {
  ActionCreator,
  Operation
} from './data-action-creator.js';

const api = createAPI(() => {});

describe(`Action creator work correctly`, () => {
  it(`Action creator correctly load questions`, () => {
    const mockQuestions = [
      {
        type: `genre`,
        genre: `rock`,
        answers: [
          {
            src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
            genre: `rock`
          }
        ]
      },
      {
        type: `artist`,
        song: {
          artist: `Jim Beam`,
          src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
        },
        answers: [
          {
            picture: `http://placehold.it/134x134`,
            artist: `Jim Beam`
          },
        ]
      },
    ];

    expect(ActionCreator.loadQuestions(mockQuestions))
      .toEqual({
        type: ActionType.LOAD_QUESTIONS,
        payload: mockQuestions
      });
  });

  it(`Should make a correct API call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [
        {
          fake: true
        }
      ]);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [
            {
              fake: true
            }
          ]
        });
      });
  });
});
