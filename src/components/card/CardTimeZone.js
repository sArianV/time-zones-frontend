import React from 'react'
import styles from './cardTimeZone.module.css'

function CardTimeZone({ timeZone }) {
  return (
    <div className={styles.card_container}>
       <div className={styles.card}>
            { timeZone }
       </div>       
    </div>
  )
}

export default CardTimeZone