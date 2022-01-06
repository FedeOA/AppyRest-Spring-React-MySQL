
import React, { Component } from 'react'
import TaskService from '../service/TaskService';

class CreateTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            description:''
        }
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id == -1){
            return
        }else{
            TaskService.getTaskById(this.state.id).then((res) =>{
                let task = res.data;
                this.setState({description: task.description
                    
                });
            });
        }        
    }
    saveOrUpdateTask = (t) => {
        t.preventDefault();
        let task = {description: this.state.description};
        console.log('task=> ' + JSON.stringify(task));

        // step 5
         if(this.state.id == -1){
            TaskService.createTask(task).then(res =>{
                this.props.history.push('/task');
            });
        }else{
            TaskService.updateTask(task, this.state.id).then( res => {
                this.props.history.push('/task');
            });
        }
    }
    
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }


    cancel(){
        this.props.history.push('/task');
    }

    getTitle(){
        if(this.state.id == -1){
            return <h3 className="text-center">Add Task</h3>
        }else{
            return <h3 className="text-center">Update Task</h3>
        }
    }
    render() {
        return (
            <div >
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" description="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateTask}>Save</button>
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

export default CreateTaskComponent