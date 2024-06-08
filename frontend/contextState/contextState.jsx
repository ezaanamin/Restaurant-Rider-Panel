import React, { createContext, useState } from 'react';
export const UserContext = createContext();

export function UserContextProvider({ children }) {

    const [NewOrderModal_, SetNewOrderModal] = useState(false);
    const [NewOrderData,SetNewOrderData]=useState([]);
    const [RiderOrderData,SetRiderOrderData]=useState([])
    const [activeTab, setActiveTab] = useState('Assigned');


  const userContextValue = {
    NewOrderModal_, SetNewOrderModal,
    NewOrderData,SetNewOrderData,
    RiderOrderData,SetRiderOrderData,
    activeTab, setActiveTab

  }

    return (
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      );

}