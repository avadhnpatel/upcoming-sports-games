import { useUserteamsContext } from "../hooks/useUserteamsContext"
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from "../hooks/useAuthContext"
import "../styles/Userteam.css"

const UserteamDetails = ({ userteam }) => {
    const { dispatch } = useUserteamsContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if (!user){
          return
        }

        const response = await fetch('/api/userteams/' + userteam._id, {
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
        })
        const json = await response.json()

        if (response.ok) {
        dispatch({type: 'DELETE_USERTEAM', payload: json})
        }
    }
    return (
      <div className="userteam-details">
        <h4>{userteam.teamName}</h4>
        <p style={{color: "var(--secondary)", fontSize:"18px"}}><strong>Days: </strong>{userteam.days}</p>
        <span className="material-icons" onClick={handleClick}><DeleteIcon/>
        </span>
      </div>
    )
  }
  
  export default UserteamDetails