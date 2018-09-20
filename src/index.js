import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import _ from 'lodash';

const mountNode = document.getElementById('root');

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Numbers = props => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0){
    	return 'selected'
    }
    if(props.usedNumbers.indexOf(number) >= 0){
    	return 'used'
    }
  }

	return (
  	<div className="card text-center">
    	<div>
				{Numbers.list.map((number, i) => <span className={numberClassName(number)} key={i} onClick={()=>{props.selectNumber(number)}}>{number}</span>)}
      </div>
    </div>
  )
}
Numbers.list= _.range(1, 10);

const Answer = props => {
	return (
  	<div className="col-5">
    	{props.selectedNumbers.map((number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>)}
    </div>
  )
}

const Button = props => {
	let button;
  switch(props.answerIsCorrect) {
  	case true:
      button =
        <button className="btn btn-success" onClick={()=>{props.acceptAnswer()}}>
          <i className="fa fa-check"></i>
        </button>;
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>;
      break;
    default:
      button =
        <button onClick={() => {props.checkAnswer()}} disabled={props.selectedNumbers.length === 0}>
          =
        </button>;
      break;
  }
	return (
  	<div className="col-2 text-center">
    	{button}
      <br /><br />
      <button className="btn btn-warning btn-sm" onClick={() => {props.redraw()}} disabled={props.numberOfRedraws < 1}>
      	<i className="fa fa-sync"> {props.numberOfRedraws}</i>
      </button>
    </div>
  )
}

const Stars = props => {
	return (
  	<div className="col-5">
    	{_.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star"></i>)}
    </div>
  )
}

const DoneFrame = props => {
	return (
  	<div className="text-center">
    <br />
    	<h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={() => {props.resetGame()}}>
      	Play Again
      </button>
    </div>
  )
}

class App extends React.Component {
//	static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  state = {
  	selectedNumbers: [],
    randomNumberOfStars : 1 + Math.floor(Math.random() * 9),
    answerIsCorrect : null,
    usedNumbers: [],
    numberOfRedraws : 5,
    doneStatus: null,
  };

  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0)
  	{this.setState(prevState => ({
    	answerIsCorrect : null,
    	selectedNumbers : prevState.selectedNumbers.concat(clickedNumber)
    }))}
  };
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect : null,
    	selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  };
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect : prevState.selectedNumbers.reduce((a, b) => a + b, 0) === prevState.randomNumberOfStars
    }));
  };
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers : prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    }), this.updateDoneStatus);
  };
  redraw = () => {
    if(this.state.numberOfRedraws > 0) {
    	this.setState(prevState=>({
        numberOfRedraws : prevState.numberOfRedraws - 1,
        randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
        answerIsCorrect: null,
        selectedNumbers: [],
   		}), this.updateDoneStatus);
    }
  }
  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1,10).filter(number=>{return usedNumbers.indexOf(number) === -1});
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  }
  updateDoneStatus = () => {
  	this.setState(prevState =>{
    	if(prevState.usedNumbers.length > 8){
      	return { doneStatus : 'You Win! Nice!'}
      }
      if(prevState.numberOfRedraws < 1 && !this.possibleSolutions(prevState)){
      	return { doneStatus : 'Game over!'}
      }
    });
  }
  resetGame = () => {
  	this.setState({
  	selectedNumbers: [],
    randomNumberOfStars : 1 + Math.floor(Math.random() * 9),
    answerIsCorrect : null,
    usedNumbers: [],
    numberOfRedraws : 5,
    doneStatus: null,
  });
  }

	render() {
  	const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      numberOfRedraws,
      doneStatus,
    } = this.state;
  	return (
    	<div className="container">
      <h3>Stars Game</h3>
      <hr />
				<div className="row">
        	<Stars numberOfStars={randomNumberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
          				checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  numberOfRedraws={numberOfRedraws}
                  redraw={this.redraw}/>
          <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        {doneStatus ?
        	<DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/> :
        	<Numbers selectedNumbers={selectedNumbers}
        				 selectNumber={this.selectNumber}
                 usedNumbers={usedNumbers}/>
        }
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);

registerServiceWorker();
