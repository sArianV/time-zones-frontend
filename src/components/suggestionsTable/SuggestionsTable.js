import React, { useContext } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import styles from './suggestionsTable.module.css'

function SuggestionsTable() {
    const timeZonesContext = useContext(TimeZonesContext);
    const { suggestions, addUserTimeZone } = timeZonesContext;

    const handleClick = async (timeZone) => {
        await addUserTimeZone(timeZone);
    }

    return (
        <div className={styles.table}>
            {
                suggestions.length > 0 ?
                    suggestions.map(timeZone => (
                        <div
                            className={styles.row}
                            key={timeZone}
                            onClick={() => handleClick(timeZone)}
                        >
                            {timeZone}
                        </div>
                    ))
                    :
                    <div
                        className={styles.row}
                    >
                        This time zone does not exist.
                    </div>
            }
        </div>
    )
}

export default SuggestionsTable