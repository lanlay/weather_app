import React, {Component} from 'react';

export default class WeatherForm extends Component {
    onFormSubmit = (e) => {
        e.preventDefault();

        let location = this.refs.location.value;

        if(location.length > 0) {
            this.refs.location.value = '';
            this.props.onSearch(location);
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" ref="location"/>
                    <button>Get Weather</button>
                </form>
            </div>
        );
    }
}