import useNotification from "../hooks/useNotification"
const Notification = () => {
  const { notification } = useNotification()
  console.log("notification", notification)
  if (notification === "") {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {notification}
    </div>
  )
  
}

export default Notification