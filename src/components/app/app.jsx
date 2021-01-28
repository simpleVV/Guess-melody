import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getQuestions} from '../../reducer/data/selectors.js';
import {getStep} from '../../reducer/game/selectors.js';
import withScreenSwitch from '../../hocs/with-screen-switch/with-screen-switch.js';

const App = (props) => {
  const {
    questions,
    step,
    renderScreen
  } = props;

  return renderScreen(questions[step]);
};

App.propTypes = {
  step: PropTypes.number.isRequired,
  renderScreen: PropTypes.func,
  questions: PropTypes.arrayOf(
      PropTypes.shape(
          {
            type: PropTypes.oneOf([`genre`, `artist`]),
            genre: PropTypes.string,
            song: PropTypes.shape(
                {
                  artist: PropTypes.string,
                  src: PropTypes.string,
                }
            ),
            answers: PropTypes.arrayOf(
                PropTypes.shape(
                    {
                      src: PropTypes.string,
                      genre: PropTypes.string
                    }
                ),
                PropTypes.shape(
                    {
                      picture: PropTypes.string,
                      artist: PropTypes.string
                    }
                )
            )
          }
      )
  ).isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: getStep(state),
  questions: getQuestions(state),
});

export {App};
export default withScreenSwitch(connect(mapStateToProps)(App));
