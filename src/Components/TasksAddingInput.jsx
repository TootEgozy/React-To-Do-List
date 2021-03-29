import React, { Component } from 'react';

class TasksAddingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="tasks-input-constant">
               <input 
               type="text"
               onKeyUp={this.props.addTask}
               >
               </input>
            </div>
        )
    }
}

export default  TasksAddingInput;
