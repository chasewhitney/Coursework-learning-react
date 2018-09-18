import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

const mountNode = document.getElementById('root');

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	let cards = props.cards;
	return (
  	<div>
			{props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
	state = {userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    const url = 'https://api.github.com/users/' + this.state.userName;
		axios.get(url).then(resp=> {
    	this.props.onSubmit(resp.data);
      this.setState({userName: ''});
    });

		// $.ajax({
		// 	type: 'GET',
		// 	url: url,
		// 	success: resp => {
	  //   	this.props.onSubmit(resp.data);
	  //   	this.setState({userName: ''});
		// 	}
		// });

  }

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input type="text"
        	value={this.state.userName}
          onChange={(event)=>this.setState({userName:event.target.value})}
        	placeholder="Github username" required />
        <button type="submit">Add Card</button>
      </form>
    );
  };
}

class App extends React.Component {
	state = {
  	cards: []
  };

	addNewCard = (cardInfo) => {
    this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }));
  };

	render() {
  	return (
    	<div>
      	<Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);

registerServiceWorker();
