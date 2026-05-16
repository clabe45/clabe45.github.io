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
                                Caleb Sacks
                            </h1>
                            <h2 className="home-section-subtitle">
                                software engineer @ google (2023-present)
                            </h2>
                            <p>
                                clark university alum (2019-2023)
                            </p>
                        </Container>
                    </div>
                    <div className="home-after-intro">
                        <Container>
                            <div className="home-section">
                                <h3 className="home-section-title">
                                    <Briefcase /> Experience
                                </h3>
                                <div>
                                    <Row className="project-row">
                                        <Col md={{ span: 4, offset: 4 }}>
                                            <Project
                                              work
                                              name="swe - google"
                                              description="Supporting internal promo platform for youtube"
                                              />
                                        </Col>
                                    </Row>
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
                                              description="Managed computer science department website and hpcc"
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
                                    {
                                        [
                                            '3d rendering',
                                            'agent skills',
                                            'agent-to-agent interaction',
                                            'agents',
                                            'angular',
                                            'api design',
                                            'caddy',
                                            'c#',
                                            'c++',
                                            'ci/cd',
                                            'code readability',
                                            'containerization',
                                            'context engineering',
                                            'cross-team collaboration',
                                            'data migration',
                                            'discord bots',
                                            'docker',
                                            'docker compose',
                                            'express.js',
                                            'fastmcp',
                                            'fullstack web development',
                                            'git',
                                            'github actions',
                                            'glsl',
                                            'hardware acceleration',
                                            'java',
                                            'karma',
                                            'linux',
                                            'litellm',
                                            'llm security',
                                            'llms',
                                            'mcp',
                                            'next.js',
                                            'nodejs',
                                            'openai api',
                                            'opengl',
                                            'performance optimization',
                                            'postgres',
                                            'project management',
                                            'prompt engineering',
                                            'protobufs',
                                            'puppeteer',
                                            'python',
                                            'react',
                                            'selenium',
                                            'slurm',
                                            'socket.io',
                                            'sql',
                                            'svelte',
                                            'system design',
                                            'technical documentation',
                                            'typescript',
                                            'unity3d',
                                            'webgl',
                                            'webrtc'
                                        ]
                                            .map(name => <Skill key={name} name={name} />)
                                    }
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
                                              name="etro"
                                              url="https://etrojs.dev"
                                              description="TypeScript video-processing framework"
                                              />
                                        </Col>
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