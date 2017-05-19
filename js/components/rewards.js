var connect = require('react-redux').connect;
import React, { Component } from 'react';
import store from '../store';
import ReactDOM from 'react-dom';
import {getSurvey} from '../actions';
import SurveyItem from './survey-item';
import EmptyReward from './empty-reward';

export class Rewards extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getSurvey());
  }
  render() {
    console.log(this.props.surveys);
    var surveyItems;
    if (this.props.surveys) {
      let surveys = this.props.surveys.surveys;
      console.log("survey Length:",surveys.length);
      if(surveys.length > 0) {
        console.log("Reword exists");
          surveyItems = Object.keys(surveys).map(function(survey, index) {
            var surveyItem = surveys[index];
            if (!surveyItem.establishment) {
              return;
            }
            return (
                <li key={index}>
                    <SurveyItem name={surveyItem.establishment.name} date={surveyItem.date} address={surveyItem.establishment.address} />
                </li>
            );
          });
      } else {
        console.log("Empty Reword");
        return(<EmptyReward/>);
      }
    }

    return (
      <div className="Rewards">
        {surveyItems}
      </div>
    )
  };

}
var mapStateToProps = function(state, props) {
    return {
        error: state.error,
        surveys: state.surveys,

    };
};

var Container = connect(mapStateToProps)(Rewards);

export default Container;
