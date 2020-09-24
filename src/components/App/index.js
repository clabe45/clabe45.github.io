import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Box, Tools } from 'react-bootstrap-icons'
import Social from '../Social'
import Project from '../Project'
import Skill from '../Skill'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

class App extends Component {
    render() {
        return (
            <div>
                <Social />
                <div className="text-center">
                    <div className="mx-0 home-section home-intro">
                        <Container>
                            <h3 className="home-section-title">
                                Hello, I am Caleb Sacks
                            </h3>
                            <em className="home-section-subtitle">
                                I am a full stack developer who loves to create quality code that helps other humans.
                                I have worked on games and video-editing software extensively, but I also like developing websites and CLIs.
                            </em>
                        </Container>
                    </div>
                    <Container className="home-section">
                        <h3 className="home-section-title">
                            <Box /> Projects
                        </h3>
                        <div>
                            <Row className="project-row">
                                <Col md={{ span: 4, offset: 2 }}>
                                    <Project host="github" owner="clabe45" name="vidar" />
                                </Col>
                                <Col md="4">
                                    <Project host="github" owner="ved-editor" name="ved" />
                                </Col>
                            </Row>
                            <Row className="project-row">
                                <Col md={{ span: 4, offset: 4}}>
                                    <Project
                                        host="itch"
                                        owner="erstelgames"
                                        name="morakk"
                                        description="A unity survival game that takes place on a planet only inhabited by robots"
                                        />
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Container className="home-section">
                        <h3 className="home-section-title">
                            <Tools /> Skills
                        </h3>
                        <div>
                            {
                                ['git', 'javascript', 'python', 'java', 'react', 'node', 'sql', 'web audio api', 'unity3d']
                                    .map((name, i) => <Skill name={name} strength="advanced" />)
                            }
                        </div>
                        <div>
                            {
                                ['c#', 'c', 'c++', 'react-native', 'socket.io', 'bootstrap', 'opengl']
                                    .map((name, i) => <Skill name={name} strength="proficient" />)
                            }
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default App