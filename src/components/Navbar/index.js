import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class AppNavbar extends Component {
    render() {
        return (
            <div className="navbar-wrapper">
                <nav>
                    <div>
                        <h3>
                            <Link to="/">Caleb Sacks</Link>
                        </h3>
                    </div>
                    <ul className="list-unstyled">
                        <Link to="/about">About</Link>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default AppNavbar