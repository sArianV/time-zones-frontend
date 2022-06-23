import React, { useContext, useEffect } from 'react'
import TimeZonesContext from '../../context/timeZones/timeZonesContext';
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
    <div className={styles.root}> user time zones: {userTimeZones.length}</div>
  )
}

export default ListTimeZones