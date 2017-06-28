import { getPlayers} from '../client';

export const CHANGE_COMPETITION = 'CHANGE_COMPETITION';
export const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER';
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const SHOW_PAGE = 'SHOW_PAGE';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const setError = error => ({type: SET_ERROR, error: error});
export const resetError = error => ({type: SET_ERROR, error: error});

export const showPage = pageNumber => ({
  type: SHOW_PAGE,
  pageNumber
});

export const changeNameFilter = nameFilter => ({
  type: CHANGE_NAME_FILTER,
  nameFilter
});

export const changeCompetition = competitionId => (dispatch, getState) => {
  dispatch({type: CHANGE_COMPETITION, competitionId});
  if(competitionId && !getState().playersByCompetition[competitionId]) {
    dispatch(requestPlayers(competitionId));
    getPlayers(competitionId)
      .then(players => dispatch(receivePlayers(competitionId, players)))
      .catch(error => dispatch(setError(error)));
  }
};

export const requestPlayers = competitionId => ({
  type: REQUEST_PLAYERS,
  competitionId
});

export const receivePlayers = (competitionId, players) => ({
  type: RECEIVE_PLAYERS,
  competitionId,
  players: players
});
