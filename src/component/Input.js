import React from "react";

import "./Input.css";

export default class Input extends React.Component { 

    render () { 
        return ( 
            <form onSubmit={this.props.handleSubmit}>
                <label>Deposit amount
                    <input type="text"/>    
                </label>
                <input type="submit" name="submit" />
            </form>
            
        );
    }
}