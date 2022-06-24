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

    function changeTimezone(date, ianatz) {
        var invdate = new Date(date.toLocaleString('en-US', {
          timeZone: ianatz
        }));      
        var diff = date.getTime() - invdate.getTime();
        
        const substract_in_miliseconds = date.getTime() - diff;
        return (new Date(substract_in_miliseconds)).getTime(); // needs to substract      
    }

    const getTimeZone = async (name) => {
        setLoading(true);
        const data = await fetchTimeZone(name);
        setLoading(false);
        const here = new Date();
        const date_in_miliseconds = changeTimezone(here, data.timezone)
        setTimeZoneData({
            ...data,
            date_in_miliseconds: date_in_miliseconds,
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
                        <Hour date_in_miliseconds={timeZoneData.date_in_miliseconds} />
                    </>
                }
            </div>
        </div>
    )
}

export default CardTimeZone