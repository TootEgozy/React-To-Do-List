import React, { Component } from 'react';

class ListInput extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        return (
            <div className="list-input-container">
                <h1>To Do List</h1>
                <div className="list-input">
                    <span>Create a new list:</span>
                    <input type="text" onKeyUp={this.props.createNewList}></input>
                    <button type="submit" onClick={this.props.createNewList}>Create</button>
                </div>
            </div>
        )
    }
}

export default ListInput;