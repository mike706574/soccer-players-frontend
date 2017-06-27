import { competitionId, nameFilter, playersByCompetition } from './index';

import {CHANGE_NAME_FILTER, CHANGE_COMPETITION, REQUEST_PLAYERS, RECEIVE_PLAYERS} from '../actions';

it('changes competition', () => {
  const action = {type: CHANGE_COMPETITION, competitionId: '1'}
  expect(competitionId('', {})) .toEqual('');
  expect(competitionId('', action)) .toEqual('1');
  expect(competitionId('2', action)).toEqual('1');
  expect(competitionId('1', action)).toEqual('1');
});

it('changes name fiter', () => {
  const action = {type: CHANGE_NAME_FILTER, nameFilter: 'foo'}
  expect(nameFilter('', {})) .toEqual('');
  expect(nameFilter('', action)) .toEqual('foo');
  expect(nameFilter('bar', action)).toEqual('foo');
  expect(nameFilter('foo', action)).toEqual('foo');
});

it('clears name filter on competition change', () => {
  const action = {type: CHANGE_COMPETITION, competitionId: '1'};
  expect(nameFilter('foo', action)).toEqual('');
});

it('requests players', () => {
  expect(playersByCompetition({}, {})) .toEqual({});

  const action = {type: REQUEST_PLAYERS, competitionId: '1'};
  expect(playersByCompetition({}, action))
    .toEqual({'1': {isFetching: true, players: []}});
});

it('receives players competition', () => {
  const action = {type: RECEIVE_PLAYERS,
                  competitionId: '1',
                  players: [{'name': 'Bob'}]};
  expect(playersByCompetition({}, action))
    .toEqual({'1': {isFetching: false, players: [{'name': 'Bob'}]}});
});

it('already has players for one competition and receives players for another', () => {
  const action = {type: RECEIVE_PLAYERS,
                  competitionId: '1',
                  players: [{'name': 'Bob'}]};
  expect(playersByCompetition({'1': {isFetching: true, players: []},
                               '2': {isFetching: false, players: [{'name': 'Dog'}]}}, action))
    .toEqual({'1': {isFetching: false, players: [{'name': 'Bob'}]},
              '2': {isFetching: false, players: [{'name': 'Dog'}]}});
});
