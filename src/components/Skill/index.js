import React, { Component } from 'react'
import Badge from 'react-bootstrap/Badge'
import './style.css'

class Skill extends Component {
    getTag() {
        if (this.props.strength === 'advanced')
            return 'h4'
        if (this.props.strength === 'proficient')
            return 'h5'
        return 'span'
    }

    render() {
        const Tag = this.getTag()

        return (
            <Tag className={`skill skill-${this.props.strength}`}>
                <Badge>{this.props.name}</Badge>
            </Tag>
        )
    }
}

export default Skill