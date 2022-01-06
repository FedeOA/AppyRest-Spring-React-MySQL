import React, { Component } from 'react'
import TaskService from '../service/TaskService';

class UpdateTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: ''
            
        }
        this.changeDescriptionTaskHandler = this.changeDescriptionTaskHandler.bind(this);
    }

    componentDidMount(){
        TaskService.getTaskById(this.state.id).then( (res) =>{
            let task = res.data;
            this.setState({description: task.description
               
            });
        });
    }
    
    updateTask = (t) => {
        t.preventDefault();
        let task = {description: this.state.description};
        console.log('task => ' + JSON.stringify(task));
        console.log('id => ' + JSON.stringify(this.state.id));
        TaskService.updateEmployee(task, this.state.id).then( res => {
            this.props.history.push('/task');
        });
    }
    
    changeDescriptionTaskHandler= (event) => {
        this.setState({description: event.target.value});
    }

    

    cancel(){
        this.props.history.push('/task');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Task</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Task name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionTaskHandler}/>
                                        </div>
                                    
                                        <button className="btn btn-success" onClick={this.updateTask}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateTaskComponent
