import { useEffect } from "react"
import { useUserteamsContext } from "../hooks/useUserteamsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import DaysInfo from "../components/DaysInfo"
// components
import UserteamDetails from "../components/UserteamDetails"
import UserteamForm from "../components/UserteamForm"
import "../styles/Userteam.css"

const Teams = () => {
  const {userteams, dispatch} = useUserteamsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchUserteams = async () => {
      const response = await fetch('/api/userteams', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_USERTEAMS', payload:json})
      }
    }
    if(user){
      fetchUserteams()
    }
  }, [dispatch, user])

  return (
    <>
      <div className="home">
      <div className="userteams">
        {userteams && userteams.map(userteam => (
          <UserteamDetails userteam={userteam} key={userteam._id} />
        ))}
      </div>
      <div className="teamform">
        <h2 style={{color: "white"}}>Add a new team <DaysInfo/></h2>
        <UserteamForm/>
      </div>
      
    </div>
    </>
    
  )
}

export default Teams