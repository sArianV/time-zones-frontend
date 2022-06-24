import React, { useEffect, useMemo, useState } from 'react'

function Hour({ date_in_miliseconds }) {
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [amPm, setAmPm] = useState()
    const [date, setDate] = useState(date_in_miliseconds)

    const getDate = (date, hours, minutes, amPm) => {
        const initialTime = new Date(date)
        const hours_24 = initialTime.getHours()
        const hours_12 = hours_24 > 12 ? hours_24 - 12 : hours_24

        const newHour = hours_12 < 10 ? `0${hours_12}` : hours_12
        const newMinutes = initialTime.getMinutes() < 10 ? `0${initialTime.getMinutes()}` : initialTime.getMinutes()
        const newAmPm = hours_24 > 12 ? 'PM' : 'AM'
        
        if ( !hours ) {                    
            setHours(newHour)
        }

        if ( !minutes ) {
            setMinutes(newMinutes)
        }
        
        if ( !amPm ) {
            setAmPm(newAmPm)
        }

        if ( hours !== newHour) {
            setHours(newHour)
        }

        if ( minutes !== newMinutes) {
            setMinutes(newMinutes)
        }

        if ( amPm !== newAmPm) {
            setAmPm(newAmPm)
        }
    }

    useEffect(() => {
        getDate(date_in_miliseconds)
        const interval = setInterval(() => {
            setDate(prev_date => prev_date + 1000)
        }, 2000);
        return () => clearInterval(interval);
    }
    , [])

    useEffect(() => {
        getDate(date, hours, minutes, amPm)
    }
    , [date])

    return (
        <div> {hours + ":" + minutes + " " + amPm} </div>
    )
}

export default Hour