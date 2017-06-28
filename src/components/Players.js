import React from 'react';
import PropTypes from 'prop-types';

import { Pagination, Media } from 'react-bootstrap';

import { showPage } from '../actions';

const pageSize = 10;

const Players = props => {
  const {dispatch, players, pageNumber} = props,
        playerCount = players.length;

  if(playerCount === 0) {
    return <p>No players found.</p>;
  }

  const pageCount = Math.ceil(playerCount / pageSize),
        firstIndex = pageSize * (pageNumber - 1),
        playersOnPage = players.slice(firstIndex, firstIndex + pageSize),
        items = playersOnPage.map((player, index) => {
          return (
            <Media key={index}>
              <Media.Left>
                <img width={64} height={64} src="http://via.placeholder.com/64x64" alt={player.name}/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>{player.name}</Media.Heading>
                <p>{player.teamName}</p>
              </Media.Body>
            </Media>
          );
        });

  const pagination = (
    <Pagination bsSize='medium'
                prev
                next
                first
                last
                maxButtons={3}
                items={pageCount}
                activePage={pageNumber}
                style={{margin: '0 0'}}
                onSelect={pageNumber => dispatch(showPage(pageNumber))} />
  );

  const noun = playerCount === 1 ? 'player' : 'players';

  return (
    <div>
      <p>{playerCount} {noun} found.</p>
      {pagination}
      <div style={{marginTop: '12px', marginBottom: '15px'}}> {items} </div> {pagination}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array.isRequired
};

export default Players;
