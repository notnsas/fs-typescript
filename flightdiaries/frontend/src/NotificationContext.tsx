import { createContext, useState } from 'react'

interface AppContext {
  notification: string;
  setNewNotification: (message: string) => void;
}

const NotificationContext = createContext< AppContext > ({} as AppContext);

export default NotificationContext

export const NotificationContextProvider = ({ children }: React.PropsWithChildren) => {
  const [notification, setNotification] = useState("")

  const setNewNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification("")
    }, 5000);
  } 
  
  return (
    <NotificationContext.Provider value={{ notification, setNewNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}