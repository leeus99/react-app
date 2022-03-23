import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TodayWeather from "./components/today-weather";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <TodayWeather/>,
    document.getElementById('root')
)

reportWebVitals();
