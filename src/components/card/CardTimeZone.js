import React, { memo, useContext, useEffect, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import styles from './cardTimeZone.module.css'
import Clock from '../clock/Clock';
import DeleteButton from '../buttons/DeleteButton';
import Loader from '../loader/Loader';

const CardTimeZone = memo(({ timeZone }) => {
    const timeZonesContext = useContext(TimeZonesContext);
    const { fetchTimeZone, deleteUserTimeZone } = timeZonesContext;

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeZoneData, setTimeZoneData] = useState();

    const getLoacation = (name) => {
        const location = name.split('/').reverse()[0];
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

    const handleDelete = async () => {
        setLoadingDelete(true);
        await deleteUserTimeZone(timeZone)
        setLoadingDelete(false);
    }

    return (
        <div className={styles.card_container}>
            {
                loading &&
                <Loader />
            }
            {!loading && timeZoneData &&
                <div className={styles.card}>
                    <div
                        className={styles.delete_button_container}
                        onClick={handleDelete}
                    >
                        {loadingDelete &&
                            <Loader />
                        }

                        {!loadingDelete &&
                            <DeleteButton />
                        }
                    </div>

                    {
                        timeZoneData &&
                        <Clock
                            ianatz={timeZoneData.timezone}
                            offset={timeZoneData.raw_offset}
                            location={timeZoneData.location}
                        />
                    }
                </div>
            }
        </div>
    )
})

export default CardTimeZone