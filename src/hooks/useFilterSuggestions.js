import React, { useEffect, useState } from 'react'

function useFilterSuggestions({ userInput, originalList }) {
    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => {
      if (!userInput) {
        setFilteredList(originalList);
        } else {
            setFilteredList(originalList.filter(item => item.toLowerCase().includes(userInput.toLowerCase())));
        }
    }, [userInput])
    
  return ({
    filteredList
  })
}

export default useFilterSuggestions