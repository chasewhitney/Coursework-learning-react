import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class Displayer extends React.Component {

  render(){
    const name = this.props.worldName;
    return (
    <h1>Hello {name}</h1>
    );
  }
}
