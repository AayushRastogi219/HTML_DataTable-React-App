import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import DataTable from './DataTable'

export default class MainForm extends Component{
  state={
    allContent:[],
    items:[],
    hasMore: true,
    columnAlignment:{columnName:'', alignValue:'left'},
    selectedWidth:{albumWidth:'', idWidth:'', titleWidth:'auto', urlWidth:'auto', thumbnailWidth:'auto'},
    selected: {},
    selectAll:false
  }
    
  componentDidMount(){
    this.getProductDetails()
  }

  componentWillUnmount(){
    //Unsubscribe events here
    //release the resources
    //clear the timers
  }

  getProductDetails=()=>{
    const productDetails = async ()=>{
      try{
        if(this.props.productUrl){
          const response = await fetch(this.props.productUrl)
          if (!response.ok) throw Error(response.statusText)

          const allProductData= await response.json()
          this.setState({allContent:allProductData},()=>{
            this.setState({items: this.state.allContent.slice(this.state.items.length, this.state.items.length + 35)},()=>{
              const initialSelection = this.state.selected;
              for(let i=1; i<= this.state.items.length; i++){
                initialSelection[i] = false
              }
              this.setState({selected:initialSelection})
            })
          })
        }
      } catch(error){
        console.log(error)
      }
    }
    productDetails()
  }

  onRowCheckBoxSelection = (event) => {
    const selected = this.state.selected;
    let isHeaderChecked = false
    selected[event.target.name] = event.target.checked;    
    for(let i = 0; i<this.state.items.length; i++){
      if(selected[i] === false){
        isHeaderChecked = false
        break
      }
      else{
        isHeaderChecked = true
      }       
    }    
    this.setState({ selected:selected,
      selectAll:isHeaderChecked
     });
  }

  onHeaderCheckBoxSelection = (event) => {
    const allSelected = this.state.selected;
    for(let i = 0; i<=this.state.items.length; i++){
      allSelected[i]=event.target.checked
    }
    this.setState({selectAll:event.target.checked,selected:allSelected})   
  }

  fetchMoreData = () => {
    const numberOfAppendRow=15;
    if (this.state.items.length >= this.state.allContent.length) {
      this.setState({ hasMore: false })
      return;
    }
    const intialLength=this.state.items.length
    let newItems = this.state.allContent.slice(intialLength, intialLength + numberOfAppendRow)
    this.setState({items: [...this.state.items, ...newItems]}, ()=>{
      const initialSelection = this.state.selected;
      for(let i=intialLength; i< (intialLength + numberOfAppendRow); i++){
        initialSelection[i] = false
      }
      this.setState({selected:initialSelection})
    })
  };

  onDataAlignmentCheckBoxChange=(event)=>{
    event.persist();
    this.setState(()=>({
      columnAlignment:{...this.state.columnAlignment, columnName:event.target.value, alignValue: event.target.checked ? this.props.rightAlign : this.props.leftAlign}
    }))
  }

  onColumnWidthChange=(event)=>{
    const name= event.target.name
    event.persist();
    
    if(name === this.props.title){
      this.setState(()=>({
        selectedWidth:{...this.state.selectedWidth, titleWidth:event.target.value}
      }))
    }
    else if(name === this.props.url){
      this.setState(()=>({
        selectedWidth:{...this.state.selectedWidth, urlWidth:event.target.value}
      }))
    }
    else if(name === this.props.thumbnailUrl){
      this.setState(()=>({
        selectedWidth:{...this.state.selectedWidth, thumbnailWidth:event.target.value}
      }))
    }
  }

  getColumnsNames=()=>{
    const allRows=this.state.items
    let headerNames=[]
    let colWidthName=Object.keys({...this.state.selectedWidth})
    let alignType=Object.keys({...this.state.alignColumn})
    
    if(allRows.length !== 0){
      Object.keys(allRows[0]).forEach((key,index)=>{
        if(isNaN(allRows[0][key]) && typeof allRows[0][key] !== 'number'){
          headerNames.push({headerLabel:key, numeric:false, width:{...this.state.selectedWidth}[colWidthName[index]]})
        }
        else{
          headerNames.push({headerLabel:key, numeric:true, alignment:{...this.state.alignColumn}[alignType[index]]})
        }
      })
    }
    return headerNames
  }

  render(){
    const { allContent, items, hasMore, columnAlignment, selectedWidth, selected, selectAll } = this.state

    return(
      <div style={tableStyle}>
        <h1>React DataTable App</h1>
        <hr />
        <InfiniteScroll dataLength={items.length} next={this.fetchMoreData} hasMore={hasMore} />

        <DataTable rows={this.state.items} columns={this.getColumnsNames()}          
          alignNumericData={this.onDataAlignmentCheckBoxChange} updateColWidth={this.onColumnWidthChange}           
          updateSelectedRow={this.onRowCheckBoxSelection} selectedRow={selected} 
          selectAll={this.state.selectAll} UpdateHeaderCheckBox={this.onHeaderCheckBoxSelection}
          alignedColumn={columnAlignment}          
        />
      </div>
    )
  }
}

MainForm.propTypes = {
  productUrl: PropTypes.string.isRequired,
  rightAlign: PropTypes.string,
  leftAlign: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string
};

MainForm.defaultProps={
  productUrl:'https://jsonplaceholder.typicode.com/photos',
  title:'title',
  url:'url',
  thumbnailUrl:'thumbnailUrl',
  rightAlign:'right',
  leftAlign:'left'
}
const tableStyle={
  margin:10
};
