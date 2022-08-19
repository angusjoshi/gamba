import React from "react";

import "./Button.css";

export default class Button extends React.Component { 

    render() { 
        return(
            <button className="gamba-button" onClick={this.props.onClick}>
                <p>{this.props.text}</p>
            </button>
        );
    }
}