import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactImage from '../assets/react.png';
import '../style.less';

export default class App extends Component {

    state = { username: null };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <div>
                {username ? <h1>{`Hello there, I'm ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
                <Link to="/users">See More Users</Link>
                <img src={ReactImage} alt="react" />
            </div>
        )
    }
}