import * as actions from './index';

it('builds changeNameFilter action', () => {
  expect(actions.changeNameFilter('foo'))
    .toEqual({nameFilter: 'foo', 'type': actions.CHANGE_NAME_FILTER});
});

it('builds requestPlayers action', () => {
  expect(actions.requestPlayers('1'))
    .toEqual({competitionId: '1', type: actions.REQUEST_PLAYERS});
});

it('builds receivePlayers action', () => {
  expect(actions.receivePlayers('1', []))
    .toEqual({competitionId: '1',
              players: [],
              type: actions.RECEIVE_PLAYERS});
});
