import React, { useContext, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import styles from './suggestionsTable.module.css'
import TableItem from './TableItem';

function SuggestionsTable() {
    const timeZonesContext = useContext(TimeZonesContext);
    const { suggestions } = timeZonesContext;

    return (
        <div className={styles.table}>
            {
                suggestions.length > 0 ?
                    suggestions.map(timeZone => (
                        <TableItem
                            timeZone={timeZone}
                            key={timeZone}
                        />
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