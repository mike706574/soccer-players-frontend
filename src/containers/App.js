import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCompetition, changeNameFilter, fetchPlayersIfNeeded } from '../actions';
import BootstrapSelect from '../components/BootstrapSelect';
import BootstrapTextBox from '../components/BootstrapTextBox';
import Players from '../components/Players';
import {filterAndSort} from '../transform';

const competitions = [{value: '426', description: "Premier League 2016/17"},
                      {value: '436', description: "Primera Division 2016/17"},
                      {value: '430', description: "1. Bundesliga 2016/17"}];

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
       <BootstrapSelect id='competition'
                        label='Competition'
                        value={this.props.competitionId}
                        options={competitions}
                        onChange={this.handleCompetitionChange} />
     );
  }

  playerView() {
    const isFetching = this.props.isFetching;
    return (
      <div>
        <form>
          {this.competitionPicker()}
          <BootstrapTextBox id='name-filter'
                            label='Name'
                            value={this.props.nameFilter}
                            placeholder=''
                            onChange={this.handleNameFilterChange} />
        </form>
        {isFetching
         ? <i className='fa fa-circle-o-notch fa-spin'
                style={{fontSize: '48px'}}></i>
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
      <div>
        <h1>Players</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {competitionId, nameFilter, playersByCompetition} = state;
  if(!competitionId) {
    return {competitionId, nameFilter, isFetching: false, players: []};
  }
  let {isFetching, players} = playersByCompetition[competitionId] || {isFetching: false, players: []};
  if(!isFetching) {
    players = filterAndSort(players, 'nameWithoutDiacritics', 'nameWithoutDiacritics', nameFilter);
  }
  return {competitionId, nameFilter, players, isFetching};
}

export default connect(mapStateToProps)(App);
