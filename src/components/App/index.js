import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Briefcase, Heart, Tools } from 'react-bootstrap-icons'
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
                            <h1 className="home-section-title">
                                Hello, I'm Caleb
                            </h1>
                            <h2 className="home-section-subtitle">
                                <em>
                                    I'm a full stack developer. I love creating <strong>sites</strong>, <strong>apps</strong>, <strong>games</strong> and <strong>developer tools</strong>, especially those related to automation and media.
                                </em>
                            </h2>
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
                                        ['git', 'linux', 'typescript', 'python', 'react', 'angular', 'node', 'c/++', 'c#', 'unity3d', 'openai', 'protobufs']
                                            .map((name, i) => <Skill name={name} strength="advanced" />)
                                    }
                                </div>
                                <div>
                                    {
                                        ['java', 'opengl', 'glsl', 'web audio api', 'socket.io', 'sql', 'express', 'github actions', 'puppeteer']
                                            .map((name, i) => <Skill name={name} strength="proficient" />)
                                    }
                                </div>
                            </div>
                            <div className="home-section">
                                <h3 className="home-section-title">
                                    <Briefcase /> Experience
                                </h3>
                                <div>
                                    <Row className="project-row">
                                        <Col md={{ span: 4 }}>
                                            <Project
                                              work
                                              name="swe intern - youtube tv"
                                              description="Added opt-in button for show and sports channel notifications"
                                              />
                                        </Col>
                                        <Col md={{ span: 4 }}>
                                            <Project
                                              work
                                              name="swe intern - markel corp"
                                              description="Supported agile price estimation team across the stack"
                                              />
                                        </Col>
                                        <Col md={{ span: 4 }}>
                                            <Project
                                              work
                                              name="sysadmin - clark university"
                                              description="Manage high-performance computing cluster"
                                              />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="home-section">
                                <h3 className="home-section-title">
                                    <Heart /> Personal Projects
                                </h3>
                                <div>
                                    <Row className="project-row">
                                        <Col md={{ span: 4 }}>
                                            <Project
                                              host="github"
                                              owner="clabe45"
                                              name="shulkr"
                                              url="https://github.com/clabe45/shulkr"
                                              />
                                        </Col>
                                        <Col md={{ span: 4 }}>
                                            <Project
                                              host="github"
                                              owner="clabe45"
                                              name="etro"
                                              url="https://etrojs.dev"
                                              description="TypeScript video-processing framework"
                                              />
                                        </Col>
                                        <Col md={{ span: 4 }}>
                                            <Project
                                                host="itch"
                                                name="protosim"
                                                description="Time-travel stealth game"
                                                url="https://erstelgames.itch.io/protosim"
                                                />
                                        </Col>
                                    </Row>
                                </div >
                            </div>
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