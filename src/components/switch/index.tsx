import React from "react";
import './style.scss';

const Switch = () => {
    return (
        <div className="container-switch">
            <span>Change Theme </span>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Switch;
