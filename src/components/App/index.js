import React, { Component } from 'react'
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
                <div className="container app-wrapper text-center">
                    <div className="home-section">
                        <h3 className="home-section-title">
                            Hello, I am Caleb Sacks
                        </h3>
                        <div className="home-section-subtitle">
                            I am a full stack developer who loves to create quality code that helps other humans.
                            I have worked on games and video-editing software extensively, but I also like developing websites and CLIs.
                        </div>
                    </div>
                    <div className="home-section">
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
                    </div>
                    <div className="home-section">
                        <h3 className="home-section-title">
                            <Tools /> Skills
                        </h3>
                        <div>
                            <Skill name="git" strength="advanced" />
                            <Skill name="javascript" strength="advanced" />
                            <Skill name="python" strength="advanced" />
                            <Skill name="java" strength="advanced" />
                            <Skill name="react" strength="advanced" />
                            <Skill name="node" strength="advanced" />
                            <Skill name="sql" strength="advanced" />
                            <Skill name="web audio api" strength="advanced" />
                            <Skill name="unity3d" strength="advanced" />
                        </div>
                        <div>
                            <Skill name="c#" strength="proficient" />
                            <Skill name="c++" strength="proficient" />
                            <Skill name="c" strength="proficient" />
                            <Skill name="react-native" strength="proficient" />
                            <Skill name="socket.io" strength="proficient" />
                            <Skill name="bootstrap" strength="proficient" />
                            <Skill name="opengl" strength="proficient" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App