import {
  CHANGE_NAME_FILTER,
  CHANGE_COMPETITION,
  REQUEST_PLAYERS,
  RECEIVE_PLAYERS,
  SET_ERROR,
  RESET_ERROR,
  SHOW_PAGE
} from '../actions';

export const initialState = {competitionId: '',
                             nameFilter: '',
                             isFetching: false,
                             playersByCompetition: {},
                             pageNumber: 1,
                             error: null};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
  case SET_ERROR:
    return {...state, error: action.error};
  case RESET_ERROR:
    return {...state, error: null};
  case CHANGE_COMPETITION:
    return {...state, competitionId: action.competitionId, nameFilter: '', pageNumber: 1};
  case CHANGE_NAME_FILTER:
    return {...state, nameFilter: action.nameFilter, pageNumber: 1};
  case REQUEST_PLAYERS:
    return {...state, isFetching: true};
  case RECEIVE_PLAYERS:
    const updatedPlayersByCompetition = {...state.playersByCompetition,
                                         [action.competitionId]: action.players};
    return {...state, playersByCompetition: updatedPlayersByCompetition, isFetching: false};
  case SHOW_PAGE:
    return {...state, pageNumber: action.pageNumber};
  default:
    return state;
  }
};

export default rootReducer;
