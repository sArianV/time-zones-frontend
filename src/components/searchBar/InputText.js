import React, { useContext, useEffect, useState } from 'react'
import styles from './inputText.module.css'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import useFilterSuggestions from '../../hooks/useFilterSuggestions';

function InputText({activeSuggestions, setActiveSuggestions}) {
    const timeZonesContext = useContext(TimeZonesContext);
    const { setSuggestions, timeZones, userTimeZones } = timeZonesContext;

    const [userInput, setUserInput] = useState('')
    const { filteredList } = useFilterSuggestions({ userInput, originalList: timeZones })

    useEffect(() => {
        setSuggestions(filteredList)
    }, [filteredList])
    
    useEffect(() => {
      setUserInput('')
    }, [userTimeZones])
    
    const handleChange = (e) => {
        if ( !activeSuggestions ) {
            setActiveSuggestions(true)
        }
        setUserInput(e.target.value)
    }

    return (
        <input
            autoComplete="off" 
            className={styles.input}
            type="text"
            placeholder="Enter a time zone"
            name='userInput'
            id='userInput'
            value={userInput}
            onChange={handleChange}
        />
    )
}

export default InputText