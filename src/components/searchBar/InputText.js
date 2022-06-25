import React, { useState } from 'react'
import styles from './inputText.module.css'
function InputText() {
    const [userInput, setUserInput] = useState('')

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