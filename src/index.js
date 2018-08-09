
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import {Changer} from './Changer.js';
import {Displayer} from './Displayer.js';
import {Misc} from './Misc.js'

class MyStuff extends React.Component{
  constructor(props){
    super(props);
    this.state = {worldName : 'Blue World'};
    this.changeName = this.changeName.bind(this);
  }

  changeName(newName){
    console.log('in changeName with:', newName);
    this.setState({worldName : newName});
  }

  render(){
    return (
      <div>
        <Displayer worldName={this.state.worldName}/>
        <Changer changerMethod={this.changeName}/>
        <Misc />
      </div>
    );
  }
}

class MyOtherStuff extends React.Component {
  state = { counter : 1}
  render() {
    return (
      <button>{this.state.counter}</button>
    )
  }
}

ReactDOM.render(<MyOtherStuff />, document.getElementById('root'));
