import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

const mountNode = document.getElementById('root');

class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFunction(this.props.incrementValue);
  }

  render(){
    return(
      <button onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    )
  }
}

const Result = (props) => {
  return(
    <div>{props.counterVal}</div>
  )
}

class App extends React.Component{
  state = {counter : 0};

  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
      counter: prevState.counter + incrementValue
    }));
  }

  render(){
    return(
      <div>
       <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
       <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
       <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
       <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
       <Result counterVal={this.state.counter}/>
      </div>
    );
  };
}

ReactDOM.render(<App/>, mountNode);

registerServiceWorker();
