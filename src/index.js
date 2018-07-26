
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

ReactDOM.render(<MyStuff />, document.getElementById('root'));
