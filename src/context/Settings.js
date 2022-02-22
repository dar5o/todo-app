import React, { useState } from 'react';

export const SettingsContext = React.createContext();

// https://daveceddia.com/usestate-hook-examples/
const Settings = (props) => {
  
  const [hide, setHide] = useState(false);
  const [displayItems, setDisplayItems] = useState(3);
  const [sortField, setSortField] = useState('')

  return (
    <SettingsContext.Provider value={{hide, displayItems, sortField, setHide, setDisplayItems, setSortField}}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default Settings;