import React, { useContext, useEffect } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
import CardTimeZone from '../card/CardTimeZone';
import styles from './listTimeZones.module.css'

function ListTimeZones() {
  const timeZonesContext = useContext(TimeZonesContext);
  const { userTimeZones, reloadUserData , getUserTimeZones } = timeZonesContext;

  const fetchUserTimeZones = async () => {
    await getUserTimeZones();
  }

  useEffect(() => {
    fetchUserTimeZones()
  }, [ reloadUserData ])

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