import reducer, {initialState} from './index';

import {CHANGE_NAME_FILTER,
        CHANGE_COMPETITION,
        REQUEST_PLAYERS,
        RECEIVE_PLAYERS} from '../actions';

it('unsupported action has no effect', () => {
  const action = {type: 'UNSUPPORTED'};
  expect(reducer(initialState, {})) .toEqual(initialState);
});

it('selects a competition', () => {
  const action = {type: CHANGE_COMPETITION, competitionId: '1'};
  const before = initialState;
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(false);
  expect(after.competitionId).toEqual('1');
  expect(after.nameFilter).toEqual('');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({});
});

it('selects another competition', () => {
  const action = {type: CHANGE_COMPETITION, competitionId: '1'};
  const before = {...initialState,
                  competitionId: '2',
                  nameFilter: 'foo',
                  pageNumber: 5,
                  playersByCompetition: {'2': []}};
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(false);
  expect(after.competitionId).toEqual('1');
  expect(after.nameFilter).toEqual('');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({'2': []});
});

it('changes name fiter', () => {
  const action = {type: CHANGE_NAME_FILTER, nameFilter: 'foo'};
  const before = {...initialState,
                  competitionId: '1',
                  pageNumber: 5,
                  playersByCompetition: {'2': []}};
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(false);
  expect(after.competitionId).toEqual('1');
  expect(after.nameFilter).toEqual('foo');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({'2': []});
});

it('requests players', () => {
  const action = {type: REQUEST_PLAYERS, competitionId: '1'};
  const before = {...initialState};
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(true);
  expect(after.competitionId).toEqual('');
  expect(after.nameFilter).toEqual('');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({});
});

it('receives players', () => {
  const action = {type: RECEIVE_PLAYERS,
                  competitionId: '1',
                  players: [{name: 'Bob'}]};
  const before = {...initialState,
                  competitionId: '1',
                  isFetching: true};
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(false);
  expect(after.competitionId).toEqual('1');
  expect(after.nameFilter).toEqual('');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({'1': [{name: 'Bob'}]})
});

it('receives mores players', () => {
  const action = {type: RECEIVE_PLAYERS,
                  competitionId: '1',
                  players: [{name: 'Bob'}]};
  const before = {...initialState,
                  competitionId: '1',
                  isFetching: true,
                  playersByCompetition: {'2': []}};
  const after = reducer(before, action);

  expect(after.error).toEqual(null);
  expect(after.isFetching).toEqual(false);
  expect(after.competitionId).toEqual('1');
  expect(after.nameFilter).toEqual('');
  expect(after.pageNumber).toEqual(1);
  expect(after.playersByCompetition).toEqual({'1': [{name: 'Bob'}],
                                              '2': []})
});
