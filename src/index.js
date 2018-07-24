
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import {Child} from './anotherFile.js';
console.log('index.js loaded');
class MyStuff extends React.Component{
  colorClick(e){
    console.log('you clicked:', e.target.value);
  }
  render(){
    return (
      <div>
        <h1>Hello World</h1>
        <h2>or Hello {this.props.name}</h2>
        <select onChange={this.colorClick}>
          <option value="blue" onClick={this.colorClick}>blue</option>
          <option value="red" onClick={this.colorClick}>red</option>
          <option value="green" onClick={this.colorClick}>green</option>
        </select>
      </div>
    );
  }
}

ReactDOM.render(<MyStuff name="AnotherWorld"/>, document.getElementById('root'));
