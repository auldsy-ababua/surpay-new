var connect = require('react-redux').connect;
import React, { Component } from 'react';
import store from '../store';
import actions from '../actions';
import { Panel, FormGroup, FormControl, Button, Radio, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import {postSurvey} from "../actions";
import ReactDOM from "react-dom";

export class Survey extends Component {
  constructor(props) {
    super(props);
    this.submitAction=this.submitAction.bind(this);
    this.request = {answers:[{question: 1, answer: null},
                             {question: 2, answer: null},
                             {question: 3, answer: null},
                             {question: 4, answer: null},
                             {question: 5, answer: null}],

                    establishment:{name: this.props.location.query.name,
                                   id: this.props.params.restaurantid,
                                   address:this.props.location.query.address,
                                   image: this.props.location.query.image}
                    };

  }
  submitAction(event) {
    event.preventDefault();
    console.log(ReactDOM.findDOMNode(this.textInput).value);
    this.setAnswer(4, ReactDOM.findDOMNode(this.textInput).value);
    store.dispatch(postSurvey(this.request, this.props.user));
    console.log(this.request);
  }
  setAnswer(question, answer) {
    this.request.answers[question].answer=answer;
  }
  render() {
    console.log(this.props.survey);
    return (
      <div>
        <form id="surveyForm" onSubmit={this.submitAction}>
          <Panel header="Question 1/5: On a scale of 1 (very poor) to 10 (perfect), how did you enjoy your food?">
            <FormGroup>
              <Radio onClick={this.setAnswer.bind(this, 0, 1)} onClick={this.setAnswer.bind(this, 0, 1)} inline>1</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 2)} onClick={this.setAnswer.bind(this, 0, 2)} inline>2</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 3)} inline>3</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 4)} inline>4</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 5)} inline>5</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 6)} inline>6</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 7)} inline>7</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 8)} inline>8</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 9)} inline>9</Radio>
              <Radio onClick={this.setAnswer.bind(this, 0, 10)} inline>10</Radio>
            </FormGroup>
          </Panel>
          <Panel header="Question 2/5: On a scale of 1 to 10, how did you feel about the price of the food?">
            <FormGroup>
              <Radio onClick={this.setAnswer.bind(this, 1, 1)} inline>1</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 2)} inline>2</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 3)} inline>3</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 4)} inline>4</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 5)} inline>5</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 6)} inline>6</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 7)} inline>7</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 8)} inline>8</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 9)} inline>9</Radio>
              <Radio onClick={this.setAnswer.bind(this, 1, 10)} inline>10</Radio>
            </FormGroup>
          </Panel>
          <Panel header="Question 3/5: On a scale of 1 to 10, how was the service you received?">
            <FormGroup>
              <Radio onClick={this.setAnswer.bind(this, 2, 1)} inline>1</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 2)} inline>2</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 3)} inline>3</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 4)} inline>4</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 5)} inline>5</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 6)} inline>6</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 7)} inline>7</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 8)} inline>8</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 9)} inline>9</Radio>
              <Radio onClick={this.setAnswer.bind(this, 2, 10)} inline>10</Radio>
            </FormGroup>
          </Panel>
          <Panel header="Question 4/5: On a scale of 1 to 10, how would you rate the cleanliness of the restaurant?">
            <FormGroup>
              <Radio onClick={this.setAnswer.bind(this, 3, 1)} inline>1</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 2)} inline>2</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 3)} inline>3</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 4)} inline>4</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 5)} inline>5</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 6)} inline>6</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 7)} inline>7</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 8)} inline>8</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 9)} inline>9</Radio>
              <Radio onClick={this.setAnswer.bind(this, 3, 10)} inline>10</Radio>
            </FormGroup>
          </Panel>
          <Panel header="Question 5/5: Please leave us any other comments you'd like us to know about">
            <FormGroup controlId="formControlsTextarea">
              <FormControl ref={(input) => { this.textInput = input; }} componentClass="textarea" placeholder="Please Leave Feedback Here" />
            </FormGroup>
          </Panel>
          <Button id="surveyButton" type="submit">
            Submit!
          </Button>
        </form>
      </div>
    );
  }
};

var mapStateToProps = function(state, props) {
    return {
        error: state.error,
        survey: state.survey,
        user: state.user,
        answers: state.answers
    };
};

var Container = connect(mapStateToProps)(Survey);


export default Container;