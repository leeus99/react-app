import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import "./search-history-card.css";

const SearchHistoryCard = ({index, history, searchGeolocationHistory, deleteHistory}) => {
    return (
        <div className="search-history-card-wrapper d-flex justify-content-between">
            <div>
                {index + 1}. {history.name}, {history.country}
            </div>
            <div>
                <span>{history.timestamp}</span>
                <span className="icon-btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass}
                                     onClick={() => searchGeolocationHistory(history)}/>
                </span>
                <span className="icon-btn">
                    <FontAwesomeIcon icon={faTrashCan}
                                     onClick={() => deleteHistory(history)}/>
                </span>

            </div>
        </div>
    );
}


export default SearchHistoryCard;
