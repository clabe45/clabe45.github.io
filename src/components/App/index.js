import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Box, Tools } from 'react-bootstrap-icons'
import Social from '../Social'
import Source from '../Source'
import Project from '../Project'
import Skill from '../Skill'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="text-center ">
                    <div className="mx-0 home-section home-intro">
                        <Container>
                            <h3 className="home-section-title">
                                Hello, my name is Caleb Sacks
                            </h3>
                            <em className="home-section-subtitle">
                                I am a full stack developer. I love to create games, multimedia tools and any other software that enhances people's lives
                            </em>
                        </Container>
                    </div>
                    <div className="home-after-intro">
                        <Container>
                            <div className="home-section">
                                <h3 className="home-section-title">
                                    <Tools /> Skills
                                </h3>
                                <div>
                                    {
                                        ['git', 'linux', 'typescript', 'python', 'react', 'angular', 'node', 'c/++', 'c#', 'unity3d', 'opengl']
                                            .map((name, i) => <Skill name={name} strength="advanced" />)
                                    }
                                </div>
                                <div>
                                    {
                                        ['java', 'glsl', 'web audio api', 'socket.io', 'sql', 'express', 'github actions']
                                            .map((name, i) => <Skill name={name} strength="proficient" />)
                                    }
                                </div>
                            </div>
                            <div className="home-section">
                                <h3 className="home-section-title">
                                    <Box /> Projects
                                </h3>
                                <div>
                                    <Row className="project-row">
                                        <Col md={{ span: 4, offset: 2 }}>
                                            <Project host="github" owner="clabe45" name="vidar" url="/vidar" />
                                        </Col>
                                        <Col md={{ span: 4, offset: 0}}>
                                            <Project
                                                host="itch"
                                                name="morakk"
                                                description="A unity survival game that takes place on a planet only inhabited by robots"
                                                url="https://erstelgames.itch.io/morakk"
                                                />
                                        </Col>
                                    </Row>
                                </div>
                            </div >
                        </Container>
                    </div>
                </div>
                <Social />
                <Source />
            </div>
        )
    }
}

export default App