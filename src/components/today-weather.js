import SearchForm from "./search-form";
import React from "react";
import Container from "react-bootstrap/cjs/Container";
import "./today-weather.css";

const TodayWeather = () =>{
    return (
        <Container className="today-weather-wrapper">
            <div className="title">
                    Today's Weather
            </div>

            <SearchForm/>
        </Container>
    );
}

export default TodayWeather;
