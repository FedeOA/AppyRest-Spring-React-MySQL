import React, { Component } from 'react'
import TaskService from '../service/TaskService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle,faClock} from '@fortawesome/free-solid-svg-icons';

class ListTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                tasks: []
        }
        this.addtask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTaskCompleted=this.updateTaskCompleted.bind(this);
    }

    deleteTask(id){
        TaskService.deleteTask(id).then( res => {
            this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
        });
    }
    viewTask(id){
        this.props.history.push(`/view-task/${id}`);
    }
    editTask(id){
        this.props.history.push(`/add-task/${id}`);
    }

    componentDidMount(){
        TaskService.getTask().then((res) => {
            this.setState({ tasks: res.data});
        });
    }

    addTask(){
        this.props.history.push('/add-task/-1');
    }

    updateTaskCompleted(id){
        TaskService.updateTaskCompleted(id).then( res => {
            this.props.history.push('/task');

        
        });
    }



    render() {
        return (
            <div>
                 <h2 className="text-center">Task List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addtask}>Add Task</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Task Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(
                                        task => 
                                        <tr key = {task.id}>
                                             <td> { task.description} </td>   
                                             <td>
                                             {
                                                    task.completado ?
                                                     <div className="text-succes small"> 
                                                     <FontAwesomeIcon icon= {faCheckCircle}/>{" "}
                                                        completed
                                                    </div>
                                                    : 
                                                     <div className="text-secundary small"> 
                                                     <FontAwesomeIcon icon= {faClock}/>{" "}
                                                        Pendiente
                                                     </div>   
                                                   }  
                                                 <form>     
                                                    <button onClick={ () => this.editTask(task.id)} className="btn btn-info">Update </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                                    <button style={{marginLeft: "10px"}} onClick={ () => this.updateTaskCompleted(task.id)} className="btn btn-secondary">Completed </button>
                                                </form>  
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListTaskComponent