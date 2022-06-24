import React, { useContext, useEffect, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import styles from './cardTimeZone.module.css'
import Hour from './Hour';

function CardTimeZone({ timeZone }) {
    const timeZonesContext = useContext(TimeZonesContext);
    const { fetchTimeZone } = timeZonesContext;

    const [loading, setLoading] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState();

    const getLoacation = (name) => {
        const location = name.split('/')[1];
        return location;
    }

    const getTimeZone = async (name) => {
        setLoading(true);
        const data = await fetchTimeZone(name);
        setLoading(false);
        setTimeZoneData({
            ...data,
            location: getLoacation(data.timezone)
        });
    }

    useEffect(() => {
        getTimeZone(timeZone)
    }, [timeZone])

    return (
        <div className={styles.card_container}>
            <div className={styles.card}>
                {
                    loading &&
                    "loading..."
                }
                {
                    timeZoneData &&
                    <>
                        <div >
                            lugar
                        </div>
                        <div >
                            fecha
                        </div>
                        <Hour ianatz={timeZoneData.timezone}/>
                    </>
                }
            </div>
        </div>
    )
}

export default CardTimeZone