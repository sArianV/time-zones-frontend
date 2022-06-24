import React from 'react'
import styles from './deleteButton.module.css'

function DeleteButton() {
  return (
    <div className={styles.delete_button}>
        <p className={styles.cross}></p>
    </div>
  )
}

export default DeleteButton