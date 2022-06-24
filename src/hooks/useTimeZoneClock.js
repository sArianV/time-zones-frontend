import React, { useEffect, useRef, useState } from 'react'

function useStateAndRef(initial) {
    const [value, setValue] = useState(initial);
    const valueRef = useRef(value);
    valueRef.current = value;
    return [value, setValue, valueRef];
}

const useTimeZoneClock = (ianatz, offset) => {
    const [year, setYear, refYear] = useStateAndRef();
    const [month, setMonth, refMonth] = useStateAndRef();
    const [day, setDay, refDay] = useStateAndRef();
    const [hours, setHours, refHours] = useStateAndRef()
    const [minutes, setMinutes, refMinutes] = useStateAndRef()
    const [amPm, setAmPm, refAmPm] = useStateAndRef()
    const [date, setDate] = useState()

    const getDate = () => {
        if (date) {
            const initialTime = new Date(date)
            const newYear = initialTime.getFullYear()
            const newMonth = initialTime.getMonth() + 1
            const newDay = initialTime.getDate()
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

            if (!year) {
                setYear(year)
            }

            if (!month) {
                setMonth(month)
            }

            if (!day) {
                setDay(day)
            }

            if (refYear.current !== newYear) {
                setYear(newYear)
            }

            if (refMonth.current !== newMonth) {
                setMonth(newMonth)
            }

            if (refDay.current !== newDay) {
                setDay(newDay)
            }

            if (refHours.current !== newHour) {
                setHours(newHour)
            }

            if (refMinutes.current !== newMinutes) {
                setMinutes(newMinutes)
            }

            if (refAmPm.current !== newAmPm) {
                setAmPm(newAmPm)
            }
        }
    }

    const initClock = () => {
        const here = new Date();
        const invdate = new Date(here.toLocaleString('en-US', {
            timeZone: ianatz
        }));

        const substract_in_miliseconds = invdate.getTime() - offset;

        setDate((new Date(substract_in_miliseconds)).getTime())
    }

    useEffect(() => {
        initClock()
        
        const interval = setInterval(() => {
            const here = new Date();
            const invdate = new Date(here.toLocaleString('en-US', {
                timeZone: ianatz
            }));

            const substract_in_miliseconds = invdate.getTime() - offset;

            setDate((new Date(substract_in_miliseconds)).getTime())
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        getDate()
    }, [date])

    return ({
        year,
        month,
        day,
        hours,
        minutes,
        amPm
    })
}

export default useTimeZoneClock;