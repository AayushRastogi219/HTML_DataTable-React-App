import React, {Component} from 'react'
import PropTypes from 'prop-types'
import table from '../css/table.css'

export default class DataTable extends Component{
  state={
    clickedRow:-1
  }

  componentWillUnmount(){
    //Unsubscribe events here
    //release the resources
    //clear the timers
  }  

  onClickChangeRowColor=(clickedRow)=>event=>{
    if (clickedRow !== undefined) {
      this.setState({ clickedRow  })
    }
  }

  addColumnHeaders(){
    return(
      this.props.columns.map((item, index)=>{
        if(item.numeric){
          return(
            <th id="t01" key={index}>
            {item.headerLabel.toUpperCase()}
            <div>
                <input type="checkbox" value={item.headerLabel} onChange={this.props.alignNumericData} />
            </div>      
            </th>
          )
        }
        else{
          return(
            <th id="t01" key={index} width={item.width}>                  
            {item.headerLabel.toUpperCase()}
            <span style={dropDownStyle}>
              <select name={item.headerLabel} value={item.width} onChange={this.props.updateColWidth}>
                <option value={this.props.smallWidth}>{this.props.smallWidth}</option>
                <option value={this.props.mediumWidth}>{this.props.mediumWidth}</option>
                <option value={this.props.autoWidth}>{this.props.autoWidth}</option>
              </select>
            </span>
            </th>
          )
        }
      })
    )
  }

  addRows(){
    return(
      [...this.props.rows].map((item,index)=>{
        return(                
          <tr className={this.state.clickedRow === item.id ? "tableSelected" : ""} key={item.id} style={{backgroundColor: this.props.selectedRow[item.id] ? this.props.selectedColor : this.props.defaultColor}} onClick={this.onClickChangeRowColor(item.id)}>

            <td><input name={item.id} type="checkbox" checked={this.props.selectedRow[item.id]} onChange={this.props.updateSelectedRow}/></td>

            {
              Object.keys(item).map((key,index)=>{
                let value = item[key];
                let isDataNonNumeric = isNaN(value) && typeof value !== 'number'
                return(isDataNonNumeric ? <td key={index} name={key}>{value}</td> : <td key={index} name={key} style={{textAlign: (this.props.alignedColumn.columnName === key) ? this.props.alignedColumn.alignValue : 'undefined'}}>{value}</td>)
              })                      
            }                      
          </tr>
        )
      })
    )
  }

  render(){
    return(
      <div>
        <table className="table tableWidth">
          <tbody>
            <tr>
                <th id="t01"><input type='checkbox' checked={this.props.selectAll} onChange={this.props.UpdateHeaderCheckBox} /></th>

              {this.addColumnHeaders()}

            </tr>

            {this.addRows()}
            
          </tbody>
        </table>
      </div>
    )
  }
}

DataTable.defaultProps={
  selectedColor:'lightblue',
  defaultColor:'white',
  smallWidth:'200px',
  mediumWidth:'10%',
  autoWidth:'auto'
}

const dropDownStyle={
  float: 'right'
}

DataTable.propTypes = {
  rows: PropTypes.array,
  alignNumericData: PropTypes.func,
  columns:PropTypes.array,
  selectedColor: PropTypes.string,
  defaultColor: PropTypes.string,
  smallWidth: PropTypes.string,
  mediumWidth: PropTypes.string,
  autoWidth: PropTypes.string,
  selectAll: PropTypes.bool,
  UpdateHeaderCheckBox: PropTypes.func,
  updateColWidth: PropTypes.func,
  selectedRow: PropTypes.object,
  onClickChangeRowColor: PropTypes.func,
  updateSelectedRow: PropTypes.func,
  alignedColumn: PropTypes.object,
};


