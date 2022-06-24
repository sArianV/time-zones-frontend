import React, { useContext, useEffect, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import styles from './cardTimeZone.module.css'
import Clock from '../clock/Clock';
import DeleteButton from '../buttons/DeleteButton';
import Loader from '../loader/Loader';
function CardTimeZone({ timeZone }) {
    const timeZonesContext = useContext(TimeZonesContext);
    const { fetchTimeZone, deleteUserTimeZone } = timeZonesContext;

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

    const handleDelete = async() => {
        deleteUserTimeZone(timeZone)
    }

    return (
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div 
                    className={styles.delete_button_container} 
                    onClick={handleDelete}
                >
                    <DeleteButton />
                </div>
                {
                    loading &&
                    <Loader />
                }
                {
                    timeZoneData &&
                    <Clock
                        ianatz={timeZoneData.timezone}
                        offset={timeZoneData.raw_offset}
                        location={timeZoneData.location}
                    />
                }
            </div>
        </div>
    )
}

export default CardTimeZone