import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {isAuthorizationRequired} = props;

    return (isAuthorizationRequired) ?
      <Redirect to = "/sign-in" />
      :
      <Component {...props} />;
  };

  WithPrivateRoute.propTypes = {
    isAuthorizationRequired: PropTypes.bool.isRequired
  };

  return WithPrivateRoute;
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export {withPrivateRoute};
export default compose(connect(mapStateToProps), withPrivateRoute);
