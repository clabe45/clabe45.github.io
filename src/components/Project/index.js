import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './style.css'

class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: 'repo description'
        }
    }

    getLink() {
        switch (this.host) {
            case 'github': {
                return `https://github.com/${this.props.owner}/${this.props.name}`
            }
            case 'itch': {
                return `https://${this.props.owner}.itch.io/${this.props.name}`
            }
            default: {
                return '#'
            }
        }
    }

    render() {
        return (
            <Card style={{ /* can't add classes to react-bootstrap components.. */backgroundColor: '#141414' }}>
                <Card.Body>
                    <Card.Title>
                        <a href={this.getLink()}>{this.props.name}</a>
                    </Card.Title>
                    <Card.Text>{this.state.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default Project