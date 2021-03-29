import React, { Component } from 'react';
 
class Task extends Component {
 constructor(props) {
     super(props);
     this.state = {
        titleDisplay: this.props.title,
        title: this.props.title,
        isCompelete: this.props.isCompelete,
        isEditMode: false
     }
 }

 editTask = async(e) => {
    //change the tasks list in the father list component
    this.props.editTask(this.state.title, this.state.titleDisplay);


     //change back buttons by changing this state isEditMode flag
     this.setState({isEditMode: false});
 }

 cancelEdit = async () => {
     console.log("edit canceled");
     this.setState({isEditMode: false});
 }

 openEditMode = () => {
     this.setState({isEditMode: true});
 }

 setStateTitle = async (e) => {
     await this.setState({titleDisplay: e.target.value});
 }

 compeleteOrUnCompelete = (e) => {
     if (e.target.checked) this.setState({isCompelete: true});
     else this.setState({isCompelete: false});
 }

 //function to render the task component.
 //if there is no edit mode, render normally.
 //if edit mode is on, render an input filed instead of the title,
 //render the buttons "save" & "cancel" with matching event listeners.
renderTask = () => {
    if (this.state.isEditMode === false) {
        return (
            //two divs and inside of each two components.
            <div className="Task">
                <div className="task-title-checkbox-container">

                    <input
                    className="checkbox" 
                    type="checkbox" 
                    value="true"
                    onClick={this.compeleteOrUnCompelete}
                    >
                    </input>

                    <span 
                    className="task-title" 
                    style={{textDecoration: this.state.isCompelete === true? "line-through" : "none"}}
                    >
                        {this.state.titleDisplay}
                    </span>

                </div>
                <div className="task-buttons">

                    <button 
                    className="task-edit"
                    onClick={this.openEditMode}
                    >Edit
                    </button>

                    <button 
                    className="task-delete"
                    onClick={this.props.deleteTask}
                    >Delete
                    </button>
                </div> 
            </div>
        )
    }
    else {
        return (
            //two divs and inside of each two components.
            <div className="Task">
                <div className="task-input-checkbox-container">
                    
                    <input 
                    className="checkbox" 
                    type="checkbox" 
                    value="true">
                    </input>

                    <input 
                    className="in-task-input"
                    type="text" 
                    value={this.state.titleDisplay}
                    onChange={this.setStateTitle}>
                    </input>

                </div>
                <div className="task-buttons">

                    <button 
                    className="task-save"
                    onClick={this.editTask}>
                        Save
                    </button>
                    
                    <button 
                    className="task-cancel"
                    onClick={this.cancelEdit}>
                        Cancel
                    </button>
                    
                </div> 
            </div>
        )
    }
}


    render() {
        return (
            <div>
                {this.renderTask()}
            </div>
        )
    }
}


export default Task;