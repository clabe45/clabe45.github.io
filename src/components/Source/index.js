import React, { Component } from 'react'
import { Code } from 'react-bootstrap-icons'
import './style.css'

class Source extends Component {
    render() {
        return (
            <h3 className="source ml-auto">
                <a href="https://github.com/clabe45/clabe45.github.io">
                    <Code />
                </a>
            </h3>
        )
    }
}

export default Source