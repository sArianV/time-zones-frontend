import React, { useContext, useEffect, useState } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import CardTimeZone from '../card/CardTimeZone';
import Loader from '../loader/Loader';
import styles from './listTimeZones.module.css'

function ListTimeZones() {
  const timeZonesContext = useContext(TimeZonesContext);
  const { userTimeZones, getUserTimeZones } = timeZonesContext;
  const [loading, setLoading] = useState(false);

  const fetchUserTimeZones = async () => {
    setLoading(true);
    await getUserTimeZones();
    setLoading(false);
  }

  useEffect(() => {
    fetchUserTimeZones()
  }, [])

  return (
    <div className={styles.root}> 
    { 
      userTimeZones && 
        userTimeZones.map( timeZone => {
          return (
            <CardTimeZone
              key={timeZone}
              timeZone={timeZone}
            />
          )
        })
    }
    
    </div>
  )
}

export default ListTimeZones