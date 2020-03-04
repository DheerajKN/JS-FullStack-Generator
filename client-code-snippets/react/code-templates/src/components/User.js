import React, { Component } from 'react';

export default class User extends Component {
    state = {
        users: []
    }
    componentWillMount() {
        fetch(`${JSON.parse(process.env.ELECTRON_PROD) ? 'http://localhost:8080/api' : '/api'}/users`)
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }
    render() {
        return (
            <div>
                {this.state.users.map(user => {
                    return (
                        <h1 key={user.user}>{user.user}</h1>
                    )
                })}
            </div>
        )
    }
}
