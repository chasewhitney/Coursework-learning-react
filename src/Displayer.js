import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


export const Displayer = (props) => {
  console.log('props:', props);
  return <h1>Hello {props.worldName}</h1>;
}
