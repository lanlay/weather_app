import React, {Component} from 'react';
import WeatherForm from './WeatherForm';
import WeatherMessage from './WeatherMessage';
import openWeatherMap from '../api/openWeatherMap';

export default class Weather extends Component {
    //noinspection JSDuplicatedDeclaration
    state = {
        isLoading: false
    };

    handleSearch = (location) => {
        this.setState({isLoading: true});

        openWeatherMap.getTemp(location)
            .then((temp) => {
                this.setState({
                    location,
                    temp,
                    isLoading: false
                })
            })
            .catch((error) => alert('Can\'t connect to the server.'));

    };

    render() {
        let {location, temp, isLoading} = this.state;
        let renderMessage = () => {
            if(isLoading) {
                return <h3>Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMessage location={location} temp={temp}/>
            }
        };

        return (
            <div>
                <h2>Weather Component</h2>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
            </div>
        );
    }
}