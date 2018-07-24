import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class Changer extends React.Component {
  constructor(props){
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event){
    const newName = event.target.value;
    this.props.changerMethod(newName);
  }

  render(){
    return (
      <select onChange={this.changeHandler}>
        <option value="Blue World">Blue</option>
        <option value="Red World">Red</option>
        <option value="Green World">Green</option>
      </select>
    );
  }
}
