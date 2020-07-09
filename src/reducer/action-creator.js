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
  })
};

export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  ActionCreator,
};
