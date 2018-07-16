import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyMessage extends React.Component {
  render(){
    return <h1>Hello World</h1>;
  }
}

ReactDOM.render(<MyMessage />, document.getElementById('root'));
