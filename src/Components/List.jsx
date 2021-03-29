import React, { Component } from 'react';
import ListInput from './ListInput';
import Task from './Task';
import TasksAddingInput from './TasksAddingInput';

class List extends Component {
    constructor(props) {
        super(props);
        // this.counter = 0;
        this.savedTasks = localStorage.getItem("tasks");
        if (this.savedTasks) this.savedTasks = [...this.savedTasks.split(",")];
        this.savedListTitle = localStorage.getItem("listTitle");
        
        this.state = {
            isList: false, //does a list exsist?
            isListInput: true, // does the input filed for creating a new list exsists?
            title: "",  //list title
            tasks: [], //all the tasks goes here
        }
    }

    componentDidMount = async() => {
        console.log(this.savedTasks);
        if (this.savedTasks) {
            this.setState({
                isList: true, 
                isListInput:false,
                title: this.savedListTitle,
                tasks: this.savedTasks            
            })
        }
        else console.log("empty tasks");
    }

    //if there is a list and a task, save them in local memory
    componentDidUpdate = async() => {
        if (this.state.isList === true && this.state.tasks.length > 0) {
            localStorage.setItem("tasks", String(this.state.tasks));
            localStorage.setItem("listTitle", String(this.state.title));
        }
    }


    // a method to create a new list. passed to the input component.
    // created to support a button click and an enter key
    createList = async(e) => {
        const input = e.target.parentElement.children[1].value;
        if(this.state.isList === false && e.keyCode === 13) {
             await this.setState({
                 isList: true,
                 isListInput: false,
                 title: input,
             });
        }
        else if (this.state.isList === false && e.type === "click") {
            await this.setState({
                isList: true,
                isListInput: false,
                title: input,
            });
        }
    }

    // a method to delete all of the list, by pressing X in the current
    // list component
    deleteList = () => {
        this.setState({
            isList: false,
            isListInput: true,
            title: '',
            tasks: [],
        })
        localStorage.removeItem("tasks");
        localStorage.removeItem("listTitle");
    }

    //add a new task
    addTask = async(e) => {
        //const input = e.target.parentElement.children[1].value;
        if (e.keyCode === 13) {

            //creating identical tasks is forbidden
            const sameTask = this.state.tasks.find(task => {
                return (task === e.target.value);
            })

            if (sameTask === undefined) {
                await this.setState({tasks: [...this.state.tasks, e.target.value]});
                this.setState({tasksCounter: this.state.tasksCounter +1})
            }
            e.target.value = "";
        }
    }

    editTask = async(oldTitle, newTitle) => {
        const oldTaskIndex = this.state.tasks.indexOf(oldTitle);
        const stateNewTaskArr = [...this.state.tasks];
        stateNewTaskArr.splice(oldTaskIndex,1, newTitle);
        await this.setState({tasks: stateNewTaskArr});
    }


    //a method to delete a task from the list tasks array, passed to the
    //component and works on the list state
    deleteTask = async(e) => {
        const taskTitle = e.target.parentElement.parentElement.children[0].children[1].innerHTML;
        const taskIndex = this.state.tasks.indexOf(taskTitle);
        
        let newStateTasks = [...this.state.tasks];
        newStateTasks.splice(taskIndex, 1);
        await this.setState({tasks: newStateTasks});

    }


    ///////////////// rendering conditions //////////////////
    // render the create list input filed:
    renderNewListInputFiled = () => {
        if(this.state.isListInput === true) {
            return (
                <ListInput createNewList={this.createList}/>
            )
        }
    }

    // render the list:
    renderNewList = () => {
        if(this.state.isList === true) {
            return (
                <div className="List">
                    <button
                    className="x-button-list"
                    onClick={this.deleteList}
                    >
                    </button>

                    <h1>{this.state.title}</h1>

                    <span className="add-task-title">Add tasks...</span>
                    <TasksAddingInput addTask={this.addTask}/>

                    {/* tasks */}
                    {this.state.tasks.map(task => {
                        return (
                            <Task
                            key={task}
                            title={task}
                            isCompelete={false}
                            deleteTask={this.deleteTask}
                            editTask={this.editTask}
                            />
                        )
                    })}

                </div>
            )
        }
    }
    render() {
        return (
            <div className="container">
                {this.renderNewListInputFiled()}
                {this.renderNewList()}
            </div>
        )
    }
}


export default List;
