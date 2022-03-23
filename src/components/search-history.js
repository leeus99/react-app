import SearchHistoryCard from "./search-history-card";
import React, {Component} from 'react';
import "./search-history.css";

export default class SearchHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            geolocationHistory: props.geolocationHistory
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({geolocationHistory: nextProps.geolocationHistory});
    }

    searchGeolocationHistory = (geolocationHistory) => {
        this.props.searchGeolocationHistory(geolocationHistory);
    }

    deleteHistory = (geolocationHistory) => {
        this.props.deleteHistory(geolocationHistory);
    }

    render() {
        const cardComponents = [...this.state.geolocationHistory].reverse().map((history, index) => {
            return <SearchHistoryCard index={index} history={history}
                                      searchGeolocationHistory={this.searchGeolocationHistory}
                                      deleteHistory={this.deleteHistory}/>
        });
        const noRecord = <div className="no-record-text">No Record</div>
        return (
            <div className="search-history-wrapper">
                <div className="title">
                    Search History
                </div>

                <div className="search-history-list-wrapper">
                    {
                        cardComponents.length ? cardComponents : noRecord
                    }
                </div>
            </div>
        );
    }
}
