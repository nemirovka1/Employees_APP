import { Component } from 'react'
import AppFilter from '../app-filter/app-filter'
import AppInfo from '../app-info/app-info'
import EmploysAddForm from '../employs-add-form/employs-add-form'
import EmploysList from '../employs-list/employs-list'
import SearchPanel from '../search-panel/search-panel'
import './app.css'

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[
                {name:'Kate', salary:500 , increase:false, like:false, id:1},
                {name:'Lusi', salary:4000 , increase:false,like:true, id:2},
                {name:'Alex', salary:2300 , increase:false,like:false, id:3},
            ],
            term:'',
            filter:''
            
        }
        this.maxId=4;
    }
deleteItem=(id)=>{
  this.setState(({data})=>{
    // const index=data.findIndex(elem=>elem.id===id);
    // const before=data.slice(0,index);
    // const after=data.slice(index+1);
    // const newArr=[...before,...after]
    return{
        data:data.filter(item=>item.id!==id)
    } })
}
addItem = (name, salary) => {
   const newItem={
    name,
    salary,
    increase:false,
    like:false,
    id:this.maxId++
   }
   this.setState(({data})=>{
    const newArr=[...data,newItem]
    return{
        data:newArr
    }
   })
}

onToggleIncrease = (id) => {
    this.setState(({data}) => ({
        data: data.map ( item => {
            if (item.id === id) {
                return {...item, increase: !item.increase}
            }
            return item
        })
    }))
}

onToggleRise = (id) =>{
    this.setState(({data}) => ({
        data: data.map ( item => {
             if (item.id === id) {
                return {...item, like: !item.like}
             }
             return item
        })
    }))
}

searchEmp=(items,term)=>{   
    if(term.length === 0){
        return items;
    }

    return items.filter(item => {
        return item.name.includes(term);
    })
 }
searchSalary=(items)=>{
    return items.filter(item=>{
        return item.salary>1000;
    })
}
 onUpdateSearch=(term)=>{
    this.setState(({term}))
 }
 handleSalary = (value,id) => {
    this.setState(({data}) => ({
        data: data.map ( item => {
            if (item.id === id) {
                return {...item, salary: value}
            }
            return item
        })
    }))

}
 filterPost=(items,filter)=>{
    switch(filter){
        case 'like':
            return items.filter(item=>item.like);
        case 'moreThen1000':
            return items.filter(item=>item.salary>1000);
        default:
            return items
    }
 }

onFilterSelect=(filter)=>{
    this.setState(({filter}))
}
    render(){
      const {data,term,filter}=this.state;
      const employees=this.state.data.length
      const increased=this.state.data.filter(elem=>elem.increase).length
      const visibelData=this.filterPost(this.searchEmp(data,term),filter);

      return (
            <div className='app'>
            <AppInfo employees={employees} increased={increased}/>
    
            <div className='search-panel'>
            <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter filter={filter}
            onFilterSelect={this.onFilterSelect}/>
            </div>

            <EmploysList
            data={visibelData}
            onDelete={this.deleteItem}
            onToggleIncrease = {this.onToggleIncrease}
            onToggleRise = {this.onToggleRise} 
            updatehandleSalary = {this.handleSalary}/>

            <EmploysAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}
export default App