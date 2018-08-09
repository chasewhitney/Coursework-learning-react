import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function goIndex2(){
  document.location.href = './index2.html?v=2';
}


export class Misc extends React.Component {
  constructor(props){
    super(props);

  }


  render(){
    class Shape {
      constructor(shape, size, color){
        this.shape = shape;
        this.size = size;
        this.color = color
      }
    }
    const a = new Shape("square", "small", "red");
    const b = new Shape("triangle", "medium", "blue");
    const c = new Shape("circle", "large", "green");
    console.log(a, b, c);
    const myArr = [a,b,c];
    console.log("myArr:", myArr);
    const reactArray = myArr.map((data, i)=>{
      console.log('this data is:', data.color);
      return <p key={i}>This shape is a {data.size} {data.color} {data.shape}.</p>;
    });
    console.log('reactArray is:', reactArray);
    return (
      <div>

      {reactArray}
      <button onClick={goIndex2}>CLICK ME</button>

      </div>
    );
  }
}
