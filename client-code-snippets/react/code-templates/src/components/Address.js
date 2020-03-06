import React, { Component } from 'react';

export default class Address extends Component {
    state = {
        addresses: []
    }
    componentWillMount() {
        fetch(`${JSON.parse(process.env.ELECTRON_PROD) ? 'http://localhost:8080/api' : '/api'}/addresses`)
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
