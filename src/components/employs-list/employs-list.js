import { Component } from "react"
import EmployeesListItem from "../employs-list-item/employs-list-item"
import "./employs-list.css"

class EmployeesList extends Component   {
    constructor (props) {
        super (props);
        this.state = {
            salary: '',
        }
    }
    render () {
        const {data, onDelete, onToggleIncrease, onToggleRise} = this.props
        const elements = data.map( el => {
            const { id, ...itemProps} = el;
            return (
                 <EmployeesListItem 
                 key = {id}
                 {...itemProps} 
                 updatehandleSalary = {(e)=>this.props.updatehandleSalary(parseInt(e),id)}
                 onDelete = { () => onDelete(id) }
                 onToggleIncrease = { () => onToggleIncrease(id)} 
                 onToggleRise = { () => onToggleRise(id)}/>
            )
        });
        return (
            <ul className="app-list list-group">
                {elements}
            </ul>
        );
    }
}
export default EmployeesList;