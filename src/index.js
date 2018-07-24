
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import {Child} from './anotherFile.js';
console.log('index.js loaded');
class MyStuff extends React.Component{
  constructor(props){
    super(props);
    this.state = {worldName : 'World'}
    this.colorClick = this.colorClick.bind(this);
  }


  colorClick(e){
    console.log('you clicked:', e.target.value);
    const newName = e.target.value;
    this.setState({worldName: newName});

  }
  render(){
    return (
      <div>
        <h1>Hello {this.state.worldName}</h1>
        <select onChange={this.colorClick}>
          <option value="Blue World" onClick={this.colorClick}>blue</option>
          <option value="Red World" onClick={this.colorClick}>red</option>
          <option value="Green World" onClick={this.colorClick}>green</option>
        </select>
      </div>
    );
  }
}

ReactDOM.render(<MyStuff />, document.getElementById('root'));
