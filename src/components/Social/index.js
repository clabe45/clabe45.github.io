import React, { Component } from 'react'
import './style.css'

class Social extends Component {
    render() {
        return (
            <div className="social ml-auto">
                <a href="https://github.com/clabe45">
                    <img alt="GitHub" src="/github-mark-light-32px.png"/>
                </a>
                <a href="https://stackoverflow.com/users/3783155/clabe45">
                    <img width="48" height="48" alt="StackOverflow" src="/so-icon.png"/>
                </a>
                <a href="https://www.linkedin.com/in/caleb-sacks-249732197">
                    <img width="36" height="36" alt="LinkedIn" src="/li-in-bug.png"/>
                </a>
            </div>
        )
    }
}

export default Social