import "./weather-card.css";

const WeatherCard = ({weather, geolocation}) => {
    return (
        <div className="details-wrapper">
            <div className="label">
                {geolocation.name}, {geolocation.country}
            </div>
            <h1>{weather.weather[0].main}</h1>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td className="label">Description:</td>
                        <td>{weather.weather[0].description}</td>
                    </tr>
                    <tr>
                        <td className="label">Temperature:</td>
                        <td>{weather.main.temp_min}&deg;C ~ {weather.main.temp_max}&deg;C</td>
                    </tr>
                    <tr>
                        <td className="label">Humidity:</td>
                        <td>{weather.main.humidity}%</td>
                    </tr>
                    <tr>
                        <td className="label">Time:</td>
                        <td>{geolocation.timestamp}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WeatherCard;
