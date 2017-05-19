import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import moment from 'moment';



export class EmptyReward extends Component {
  render() {
    //let formattedDate = moment(this.props.date).format('ll');
    return (
      <div className="EmptyReward">
        <Jumbotron>
          <div className='container'>
            <p>Uh Oh. There are no rewards for you yet. It looks like you haven’t filled out any surveys…or the business you surveyed isn’t participating yet. In the mean time, try filling out more surveys, and if any of the businesses you already surveyed start participating, you’ll see your reward voucher here.</p>
          </div>
        </Jumbotron>
      </div>
    )
  };
}

var mapStateToProps = function(state, props) {
    return {
        error: state.error
    };
};

var Container = connect(mapStateToProps)(EmptyReward);

export default Container;
