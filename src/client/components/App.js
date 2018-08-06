import React, { Component , Fragment } from 'react';
import { connect } from 'react-redux';
import "../app.scss";
import Square from './Square';
import {updateGrid} from '../actions'
import fetch from 'isomorphic-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(value, index) {
    if ( value === null ){
      console.log(value);
      //this.props.dispatch(detailsModal(null));
      fetch('/api/action', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: `{ "squareId": ${index} }`,
      
      })
      .then( (resp) => { return resp.json(); })
      .then( (data) => {
        console.log(data);
        this.props.dispatch(updateGrid(data.grid));
        if ( data.winner != undefined ){
          alert('The winner is: '+data.winner);
        }
      })
      .catch((error) => {
        alert('Sorry an error occurred !');
      });
    }
    
  }
 
  componentDidMount() {
    //const self = this;
    fetch('/api/newgame')
    .then((resp) => { return resp.json(); })
    .then( (data) => {
      this.props.dispatch(updateGrid(data.grid));
    })
    .catch(function(error) {
      alert('Sorry an error occurred !');
    });  
  }

  render() {
    const self = this;
    console.log('this=', this);
    return (
      <div className='content'>
        <h1>Tic Tac Toe</h1>
        <div className='board'>
          {this.props.gridReducer.map((value, index)=>{
            return <Square key={index} value={value} handleClick={() => { self.handleClick(value,index) }} />
          })}
        </div>
      </div>
    );
  }
}

//Connects the App component to the Redux store.
export default connect((state) => state)(App);
