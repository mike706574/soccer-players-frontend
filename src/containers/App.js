import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCompetition, changeNameFilter, fetchPlayersIfNeeded } from '../actions';
import BasicTextBox from '../components/BasicTextBox';
import BasicSelect from '../components/BasicSelect';
import Players from '../components/Players';

const competitions = [{value: '445', description: 'Premier League'}];

class App extends Component {
  static propTypes = {
    competitionId: PropTypes.string.isRequired,
    nameFilter: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.term !== this.props.term) {
      const { dispatch, term } = nextProps;
      dispatch(fetchPlayersIfNeeded(term));
    }
  }

  handleNameFilterChange = nextNameFilter => {
    this.props.dispatch(changeNameFilter(nextNameFilter));
  }

  handleCompetitionChange = nextCompetitionId => {
    this.props.dispatch(changeCompetition(nextCompetitionId));
  }

  competitionPicker() {
     return (
       <BasicSelect value={this.props.competitionId}
                    options={competitions}
                    onChange={this.handleCompetitionChange} />
     );
  }

  playerView() {
    const competitionId = this.props.competitionId;
    const competition = competitions.find(competition => competition.value === competitionId);
    const isFetching = this.props.isFetching;
    console.log( "FETCHING?" + isFetching);
    return (
      <div>
        {this.competitionPicker()}
        <h3>{competition.description}</h3>
        <h5>Players</h5>
        <BasicTextBox value={this.props.nameFilter}
                      onChange={this.handleNameFilterChange}  />
        {this.props.isFetching
          ? <p>Loading...</p>
          : <Players players={this.props.players}/>}
      </div>
    );
  }

  render() {
    let content;

    if(this.props.competitionId) {
      content = this.playerView();
    }
    else {
      content = this.competitionPicker();
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            {content}
          </div>
        </div>
      </div>
  );
  }
}

function searchableName(player) {
  return player['name-without-diacritics'];
}

function comparePlayers(a, b) {
  const aName = searchableName(a);
  const bName = searchableName(b);
  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
}

const mapStateToProps = state => {
  const {competitionId, nameFilter, playersByCompetition} = state;
  if(!competitionId) {
    return {competitionId, nameFilter, isFetching: false, players: []};
  }
  let {isFetching, players} = playersByCompetition[competitionId] || {isFetching: false, players: []};
  if(nameFilter !== '') {
    players = players
      .filter(player => searchableName(player).match(new RegExp(nameFilter, 'i')));
  }
  players.sort(comparePlayers);
  return {competitionId, nameFilter, players, isFetching};
}

export default connect(mapStateToProps)(App);
