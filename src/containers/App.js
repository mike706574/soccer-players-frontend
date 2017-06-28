import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCompetition, changeNameFilter } from '../actions';
import BootstrapSelect from '../components/BootstrapSelect';
import BootstrapTextBox from '../components/BootstrapTextBox';
import Error from '../components/Error';
import Players from '../components/Players';
import * as transform from '../transform';

const competitions = [{value: '426', description: "Premier League 2016/17"},
                      {value: '436', description: "Primera Division 2016/17"},
                      {value: '430', description: "1. Bundesliga 2016/17"}];

const spinner = (
  <i className='fa fa-circle-o-notch fa-spin'
     style={{fontSize: '48px'}}></i>
);

class App extends Component {
  static propTypes = {
    error: PropTypes.object,
    competitionId: PropTypes.string.isRequired,
    nameFilter: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleNameFilterChange = nextNameFilter => {
    this.props.dispatch(changeNameFilter(nextNameFilter));
  }

  handleCompetitionChange = nextCompetitionId => {
    this.props.dispatch(changeCompetition(nextCompetitionId));
  }

  competitionPicker() {
     return (
       <BootstrapSelect id='competition'
                        label='Competition'
                        value={this.props.competitionId}
                        options={competitions}
                        onChange={this.handleCompetitionChange}
                        placeholder='Please select a competition.' />
     );
  }

  playerView() {
    const isFetching = this.props.isFetching;

    let content = spinner;

    if(!isFetching) {
      content = (
        <Players players={this.props.players}
                 pageNumber={this.props.pageNumber}
                 dispatch={this.props.dispatch}/>
      );
    }

    return (
      <div>
        <form>
          {this.competitionPicker()}
          <BootstrapTextBox id='name-filter'
                            label='Name'
                            value={this.props.nameFilter}
                            placeholder='Type here to filter players by name.'
                            onChange={this.handleNameFilterChange} />
        </form>
        {content}
      </div>
    );
  }

  render() {
    const {error, competitionId} = this.props;

    if(error) {
      return <Error error={this.props.error} />;
    }

    return (
      <div>
        <h1>Soccer Players</h1>
        {competitionId ? this.playerView() : this.competitionPicker()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {error, competitionId, isFetching} = state;
  if(error || !competitionId || isFetching) {
    return {...state, players: []};
  }

  const {playersByCompetition, nameFilter} = state,
        players = playersByCompetition[competitionId],
        filteredPlayers = transform.filterAndSort(players,
                                                  'nameWithoutDiacritics',
                                                  'nameWithoutDiacritics',
                                                  nameFilter);
  return {...state, players: filteredPlayers};
};

export default connect(mapStateToProps)(App);
