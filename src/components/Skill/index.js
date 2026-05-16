import React, { Component } from 'react'
import Badge from 'react-bootstrap/Badge'
import './style.css'

class Skill extends Component {
    getTag() {
        return 'h4'
    }

    render() {
        const Tag = this.getTag()

        return (
            <Tag className="skill">
                <Badge>{this.props.name}</Badge>
            </Tag>
        )
    }
}

export default Skill