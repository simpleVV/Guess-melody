import {NameSpace} from '../name-space.js';

export const getAuthorizationUser = (state) => state[NameSpace.USER].isAuthorizationRequired;
