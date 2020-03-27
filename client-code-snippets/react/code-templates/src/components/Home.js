import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactImage from '../assets/logo.png';
import '../style.css';

import {fetchAPI} from '../api/fetchApi';

export default class App extends Component {

    state = { username: null };

    componentDidMount() {
        fetchAPI('/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <div>
                <img src={ReactImage} alt="react" style={{ height: '250px' }} />
                {username ? <h1>{`Hello there, I'm ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
                <Link to="/addresses">See More addresses</Link>
            </div>
        )
    }
}