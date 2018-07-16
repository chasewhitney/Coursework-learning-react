import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyMessage extends React.Component {
  render(){
    return <h1>Hello {this.props.name}</h1>;
  }
}

ReactDOM.render(<MyMessage name="World"/>, document.getElementById('root'));
