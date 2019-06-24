// import React from 'react';
// import ReactDOM from 'react-dom';
// import {render, fireEvent, cleanup} from 'react-testing-library';
// import DataTable from '../src/components/DataTable.js'

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<DataTable />, div);
//   });

// afterEach(cleanup);


// test('getColumns should contains table columns',()=>{
//     const value = DataTable.getColumns.length
//     expect(value).toBeGreaterThan(0)
// })
// it('dropDown to change column width after selection', () => {
//     const {queryByLabelText, getByLabelText} = render(
//       <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//     );