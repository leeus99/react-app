import React from "react";
import WeatherCard from "./weather-card";
import NoResultCard from "./no-result-card";
import SearchHistory from "./search-history";
import Row from "react-bootstrap/Row";
import "./search-form.css";

class SearchForm extends React.Component {

    apiKey = "1a767f60a3af0cc84c8b1b46ed63ff8e";
    geoApi = "http://api.openweathermap.org/geo/1.0/direct?limit=10&appid=" + this.apiKey;
    weatherApi = "https://api.openweathermap.org/data/2.5/weather?&appid=" + this.apiKey;

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            country: '',
            isSearched: false,
            noResult: false,
            weatherResult: null,
            geolocation: null,
            geolocationHistory: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.searchGeolocationHistory = this.searchGeolocationHistory.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(values => ({...values, [name]: value}))
    }

    searchGeolocationHistory(geolocationHistory) {
        this.setState({
            city: geolocationHistory.name,
            country: geolocationHistory.country
        });
    }

    deleteHistory(geolocationHistory) {
        this.setState({
            geolocationHistory: this.state.geolocationHistory.filter(history => history.name !== geolocationHistory.name && history.country !== geolocationHistory.country)
        })
    }

    handleSubmit(event) {
        // get geolocation API
        fetch(this.geoApi + "&q=" + this.state.city)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result.length) {
                        const geoResult = result.find((r) => r.country.toLowerCase() === this.state.country?.toLowerCase());
                        if (geoResult) {

                            // get weather API
                            fetch(this.weatherApi + "&lat=" + geoResult.lat + "&lon=" + geoResult.lon)
                                .then(res => res.json())
                                .then((weatherResult => {
                                    if (weatherResult) {
                                        const gResult = {...geoResult, timestamp: new Date().toLocaleString()}
                                        this.setState({
                                            noResult: false,
                                            weatherResult: weatherResult,
                                            geolocation: gResult,
                                            isSearched: true,
                                            geolocationHistory: [...this.state.geolocationHistory.filter(history => history.name !== gResult.name && history.country !== gResult.country), gResult]
                                        });
                                    } else {
                                        this.setNoResult();
                                    }
                                }));

                        } else {
                            this.setNoResult();
                        }

                    } else {
                        this.setNoResult();
                    }
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isSearched: true,
                        noResult: true,
                        error
                    });
                }
            )
        event.preventDefault();
    }

    setNoResult() {
        this.setState({
            noResult: true,
            result: null,
            isSearched: true
        });
    }

    clearForm() {
        this.setState({city: '', country: ''});
    }

    render() {
        const noResult = this.state.noResult;
        const isSearched = this.state.isSearched;
        return (
            <div>
                <Row>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            City:
                            <input type="text" name="city" value={this.state.city || ""} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Country:
                            <input type="text" name="country" value={this.state.country || ""}
                                   onChange={this.handleChange}/>
                        </label>
                        <button className="form-btn" type="submit">Search</button>
                        <button className="form-btn" type="button" onClick={this.clearForm}>Clear</button>
                    </form>
                </Row>

                {
                    isSearched ? noResult ? <NoResultCard/> :
                        <Row>
                            <WeatherCard weather={this.state.weatherResult} geolocation={this.state.geolocation}/>
                        </Row> :
                        <div/>
                }
                <Row>
                    <SearchHistory geolocationHistory={this.state.geolocationHistory}
                                   searchGeolocationHistory={this.searchGeolocationHistory}
                                   deleteHistory={this.deleteHistory}/>
                </Row>
            </div>

        );
    }
}

export default SearchForm;
