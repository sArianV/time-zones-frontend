import React from 'react'
import ListTimeZones from '../../components/listTimeZones/ListTimeZones'
import SearchBar from '../../components/searchBar/SearchBar'
import Title from '../../components/title/Title'
import styles from './timeZones.module.css'

function TimeZones() {
  return (
    <div className={styles.root}>
        <div className={styles.title}>
           <Title />
        </div>
        <div className={styles.search}>
            <SearchBar />
        </div>
        <div className={styles.list}>
            <ListTimeZones />   
        </div>        
    </div>
  )
}

export default TimeZones