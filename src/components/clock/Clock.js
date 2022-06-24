import React from 'react'
import useTimeZoneClock from '../../hooks/useTimeZoneClock'
import styles from './clock.module.css'

function Clock({ ianatz, offset, location }) {
    const { year, month, day, hours, minutes, amPm } = useTimeZoneClock(ianatz, offset)

    return (
        <div className={styles.root}>
            {hours != null && minutes != null && amPm != null && year != null && month != null && day != null &&
                <>
                    <div >
                        {location}
                    </div>
                    <div>
                        {day}/{month}/{year}
                    </div>
                    <div>
                        {hours}:{minutes} {amPm}
                    </div>
                </>
            }
        </div>
    )
}

export default Clock