import React, { Component } from 'react';
import {fetchAPI} from '../api/fetchApi';

export default class Address extends Component {
    state = {
        addresses: []
    }
    componentWillMount() {
        fetchAPI('/addresses')
            .then(res => res.json())
            .then(addresses => this.setState({ addresses }));
    }
    render() {
        return (
            <div>
                {this.state.addresses.map(address => {
                    return (
                        <h1 key={address.address}>{address.address}</h1>
                    )
                })}
            </div>
        )
    }
}
