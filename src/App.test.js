import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import MainForm from '../src/components/MainForm.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<MainForm />, div);
// });

// test('getColumns should contains table columns',()=>{
//   const value = MainForm.getColumns.length
//   expect(value).toBeGreaterThan(0)
// })
