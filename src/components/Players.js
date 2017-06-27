import React from 'react';
import PropTypes from 'prop-types';

import { Media } from 'react-bootstrap';

const Players = ({players}) => {
  if(players.length === 0) {
    return <p>No players found.</p>;
  }

  const items = players.map((player, index) => {
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

  return (
    <div>
      {items}
    </div>
  );
};

Players.propTypes = {
  players: PropTypes.array.isRequired
};

export default Players;
