
import React, { Component } from 'react'
import TaskService from '../service/TaskService'

class ViewTaskComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            task: {}
        }
    }

    componentDidMount(){
        TaskService.getTaskById(this.state.id).then( res => {
            this.setState({task: res.data});
        })
    }

    render() {
        return (
            <div >
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Tasks</h3>
                    <div className = "card-body">
                        <div className = "row">
                            
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewTaskComponent