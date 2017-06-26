import { getPlayers} from '../client';

export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER';
export const CHANGE_COMPETITION = 'CHANGE_COMPETITION';
export const INVALIDATE_TERM = 'INVALIDATE_TERM';

export const changeNameFilter = nameFilter => ({
  type: CHANGE_NAME_FILTER,
  nameFilter
});

export const changeCompetition = competitionId => (dispatch, getState) => {
  if(!getState().playersByCompetition[competitionId]) {
    dispatch(requestPlayers(competitionId));
    getPlayers(competitionId)
      .then(players => dispatch(receivePlayers(competitionId, players)));
  }
  return dispatch({type: CHANGE_COMPETITION, competitionId});
};

export const requestPlayers = competitionId => ({
  type: REQUEST_PLAYERS,
  competitionId
});

export const receivePlayers = (competitionId, players) => ({
  type: RECEIVE_PLAYERS,
  competitionId,
  players: players,
  receivedAt: Date.now()
});

const fetchPlayers = competitionId => dispatch => {
  return getPlayers(competitionId)
    .then(players => dispatch(receivePlayers(competitionId, players)));
};

const shouldFetchPlayers = (state, competitionId) => {
  return !state.playersByCompetition[competitionId];
};

export const fetchPlayersIfNeeded = competitionId => (dispatch, getState) => {
  if(shouldFetchPlayers(getState(), competitionId)) {
    return dispatch(fetchPlayers(competitionId));
  }
};
