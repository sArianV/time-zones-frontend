import React, { useEffect, useRef, useState } from 'react'

function useStateAndRef(initial) {
    const [value, setValue] = useState(initial);
    const valueRef = useRef(value);
    valueRef.current = value;
    return [value, setValue, valueRef];
}

function Hour({ ianatz }) {
    const [hours, setHours, refHours] = useStateAndRef()
    const [minutes, setMinutes, refMinutes] = useStateAndRef()
    const [amPm, setAmPm, refAmPm ] = useStateAndRef()
    const [date, setDate] = useState()

    const getDate = () => {
        if (date) {
            const initialTime = new Date(date)
            const hours_24 = initialTime.getHours()
            const hours_12 = hours_24 > 12 ? hours_24 - 12 : hours_24

            const newHour = hours_12 < 10 ? `0${hours_12}` : hours_12
            const newMinutes = initialTime.getMinutes() < 10 ? `0${initialTime.getMinutes()}` : initialTime.getMinutes()
            const newAmPm = hours_24 > 12 ? 'PM' : 'AM'

            if (!hours) {
                setHours(newHour)
            }

            if (!minutes) {
                setMinutes(newMinutes)
            }

            if (!amPm) {
                setAmPm(newAmPm)
            }

            if (refHours.current !== newHour) {
                setHours(newHour)
            }

            if (refMinutes.current !== newMinutes) {
                setMinutes(newMinutes)
            }

            if ( refAmPm.current !== newAmPm) {
                setAmPm(newAmPm)
            }
        }
    }

    useEffect(() => {
        getDate()
        const interval = setInterval(() => {
            const here = new Date();
            const invdate = new Date(here.toLocaleString('en-US', {
                timeZone: ianatz
            }));
            const diff = here.getTime() - invdate.getTime();

            const substract_in_miliseconds = here.getTime() - diff;

            setDate((new Date(substract_in_miliseconds)).getTime())
        }, 2000);
        return () => clearInterval(interval);
    }
    , [])

    useEffect(() => {
        getDate()
    }
    , [date])

    return (
        <div>
            { hours != null && minutes != null && amPm != null &&
                <>
                    {hours + ":" + minutes + " " + amPm}
                </>
            }
        </div>
    )
}

export default Hour