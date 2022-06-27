import React, { useContext, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import Loader from '../loader/Loader';
import styles from './tableItem.module.css'

function TableItem({ timeZone}) {
    const timeZonesContext = useContext(TimeZonesContext);
    const { addUserTimeZone } = timeZonesContext;
    const [ loading , setLoading ] = useState(false);

    const handleClick = async (timeZone) => {
        setLoading(true);
        await addUserTimeZone(timeZone);
        setLoading(false);
    }

    return (
        <div
            className={styles.row}
            onClick={() => handleClick(timeZone)}
        >
            <div className={styles.name}>
                {timeZone}
            </div>

            { loading &&
                <div>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default TableItem