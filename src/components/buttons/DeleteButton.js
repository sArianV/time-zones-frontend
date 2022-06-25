import React from 'react'
import styles from './deleteButton.module.css'
import DELETE_ICON from './delete.svg'

function DeleteButton() {
  return (
    <div className={styles.delete_button}>
      <div className={styles.cross}> <img src={DELETE_ICON} alt="React Logo" /></div>
    </div>
  )
}

export default DeleteButton