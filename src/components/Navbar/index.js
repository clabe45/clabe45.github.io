import React, { Component } from 'react'
import './style.css'

class AppNavbar extends Component {
    render() {
        return (
            <div className="navbar-wrapper">
                <nav>
                    <div>
                        <h3>Caleb Sacks</h3>
                    </div>
                    <ul className="list-unstyled">
                        <li>About</li>
                        <li>...</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default AppNavbar