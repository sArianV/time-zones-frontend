import React, { useContext, useEffect, useState } from 'react'
import styles from './searchBar.module.css'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import SuggestionsTable from '../suggestionsTable/SuggestionsTable';

function SearchBar() {
  const timeZonesContext = useContext(TimeZonesContext);
  const { fetchTimeZones, reloadUserData } = timeZonesContext;

  const [activeSuggestions, setActiveSuggestions] = useState(false)

  useEffect(() => {

    fetchTimeZones()
    setActiveSuggestions(false)
  }, [reloadUserData])
  
  const toggleSuggestions = () => {
    setActiveSuggestions(prevActiveSuggestions => !prevActiveSuggestions)
  }

  return (
    <div className={styles.root}>
      <div className={styles.input_container} onClick={toggleSuggestions}>
        
      </div>
      {activeSuggestions &&
        <div className={styles.suggestions}>
          <SuggestionsTable />
        </div>
      }
    </div>
  )
}

export default SearchBar