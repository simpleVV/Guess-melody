import {NameSpace} from '../name-space.js';

export const getStep = (state) => state[NameSpace.GAME].step;
export const getMistakes = (state) => state[NameSpace.GAME].mistakes;
export const getErrorCount = (state) => state[NameSpace.GAME].errorCount;
export const getGameTime = (state) => state[NameSpace.GAME].gameTime;
export const getMinutes = (state) => state[NameSpace.GAME].minutes;
export const getIsTimerStop = (state) => state[NameSpace.GAME].isTimerStop;
