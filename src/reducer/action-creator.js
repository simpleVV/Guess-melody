const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((answer, i) => answer === (
    question.answers[i].genre === question.genre
  ));

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;
    const mistakeStep = 1;

    switch (question.type) {

      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;

      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + mistakeStep >= maxMistakes) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : mistakeStep
    };
  },

  decrementTime: (time) => {
    return {
      type: `DECREMENT_TIME`,
      payload: (time > 0) ? 1000 : 0
    };
  },

  reset: () => ({
    type: `RESET`
  }),

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions
    };
  },

  requireAuthorization: (status) => {
    return {
      type: `REQUIRE_AUTHORIZATION`,
      payload: status
    };
  }
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
    .then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
    });
  },

  login: (userData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userData.email,
      password: userData.password
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(false));
    });
  }
};

export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  ActionCreator,
  Operation
};
