import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function NewFeature() {
  interface Message {
  greeting: string;
  leaving: string;
  };
const message = {
  greeting: "Hello World",
  leaving: "good bye world",
  };
const messageTwo = {
  greeting: "Hey World",
  leaving: "bye world",
  };
  
 return <div>{message.greeting} and {message.leaving}</div>;

};