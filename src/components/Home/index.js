import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Box, Tools } from 'react-bootstrap-icons'
import Project from '../Project'
import Skill from '../Skill'
import './style.css'

class Home extends Component {
    render() {
        return (
            <Container>
                <div className="home-section">
                    <h3 className="home-section-title">
                        <Box /> Projects
                    </h3>
                    <div>
                        <Row>
                            <Col>
                                <Project host="github" owner="clabe45" name="vidar" />
                            </Col>
                            <Col>
                                <Project host="github" owner="ved-editor" name="ved" />
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
            </Container>
        )
    }
}

export default Home