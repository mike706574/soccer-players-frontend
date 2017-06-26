import React from 'react';
import PropTypes from 'prop-types';

const Players = ({players}) => {
  if(players.length === 0) {
    return <ul><li>No players found.</li></ul>;
  }

  const items = players.map((player, i) => {
      return <li key={i}>{player.name}</li>;
  });

  return <ul>{items}</ul>;
};

Players.propTypes = {
  players: PropTypes.array.isRequired
};

export default Players;
