import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header >
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div style={{backgroundColor:""}}><a href="https://javaguides.net" className="navbar-brand">Ensolvers App</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent