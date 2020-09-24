import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './style.css'

class Project extends Component {
    constructor(props) {
        super(props)

        this.state = {
            description: ''
        }
    }

    componentDidMount() {
        if (this.props.host === 'github') {
            fetch(`https://api.github.com/repos/${this.props.owner}/${this.props.name}`)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({ description: resp.description })
                })
        } else {
            if (this.props.description)
                this.setState({ description: this.props.description })
            else
                throw new Error('must provide a description for projects that are not hosted on github')
        }
    }

    getLink() {
        switch (this.props.host) {
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
            <Card className="project">
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