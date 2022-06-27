import React, { useContext, useEffect, useState } from 'react'
import styles from './searchBar.module.css'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import SuggestionsTable from '../suggestionsTable/SuggestionsTable';
import InputText from './InputText';

function SearchBar() {
  const timeZonesContext = useContext(TimeZonesContext);
  const { fetchTimeZones, userTimeZones, timeZones } = timeZonesContext;

  const [activeSuggestions, setActiveSuggestions] = useState(false)

  useEffect(() => {
    if ( timeZones.length === 0 ) {
      fetchTimeZones()
    }
    setActiveSuggestions(false)
  }, [userTimeZones])
  
  const toggleSuggestions = () => {
    setActiveSuggestions(prevActiveSuggestions => !prevActiveSuggestions)
  }

  return (
    <div className={styles.root}>
      <div className={styles.input_container} onClick={toggleSuggestions}>        
        <InputText activeSuggestions={activeSuggestions} setActiveSuggestions={setActiveSuggestions}/>        
      </div>

      <div className={styles.toggle_suggestions} onClick={toggleSuggestions}>
        {activeSuggestions ? 
          <div className={styles.arrow_up}/>
          :
          <div className={styles.arrow_down} />
        }
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