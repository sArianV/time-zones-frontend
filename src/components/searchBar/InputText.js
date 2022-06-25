import React, { useContext, useEffect, useState } from 'react'
import styles from './inputText.module.css'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import useFilterSuggestions from '../../hooks/useFilterSuggestions';

function InputText() {
    const timeZonesContext = useContext(TimeZonesContext);
    const { setSuggestions, timeZones, reloadUserData } = timeZonesContext;

    const [userInput, setUserInput] = useState('')
    const { filteredList } = useFilterSuggestions({ userInput, originalList: timeZones })

    useEffect(() => {
        setSuggestions(filteredList)
    }, [filteredList])
    
    useEffect(() => {
      setUserInput('')
    }, [reloadUserData])
    
    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    console.log(userInput)

    return (
        <input
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