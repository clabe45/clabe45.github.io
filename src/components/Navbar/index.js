import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import './style.css'

class AppNavbar extends Component {
    render() {
        return (
            <div className="navbar-wrapper">
                <nav>
                    <div>
                        <h4>
                            <Link to="/">Caleb Sacks</Link>
                        </h4>
                    </div>
                    <ul className="list-unstyled">
                        <Plus /> <Link to="/about">About</Link>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default AppNavbar