import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import _ from 'lodash';

const mountNode = document.getElementById('root');

const Numbers = props => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0){
    	return 'selected'
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
	return (
  	<div className="col-2">
    	<button disabled={props.selectedNumbers.length === 0}>=</button>
    </div>
  )
}

const Stars = props => {
	return (
  	<div className="col-5">
    	{_.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star">*</i>)}
    </div>
  )
}

class App extends React.Component {
  state = {
  	selectedNumbers: [],
    randomNumberOfStars : 1 + Math.floor(Math.random() * 9)
  }

  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.indexOf(clickedNumber) < 0)
  	{this.setState(prevState => ({
    	selectedNumbers : prevState.selectedNumbers.concat(clickedNumber)
    }))}
  }

  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers : prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }

	render() {
  	const {selectedNumbers, randomNumberOfStars} = this.state;
  	return (
    	<div className="container">
      <h3>Stars Game</h3>
      <hr />
				<div className="row">
        	<Stars numberOfStars={randomNumberOfStars}/>
          <Button selectedNumbers={selectedNumbers}/>
          <Answer selectedNumbers={selectedNumbers}
          				unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
        				 selectNumber={this.selectNumber}/>
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);

registerServiceWorker();
