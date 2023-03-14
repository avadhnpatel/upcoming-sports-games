import {useState} from 'react'
import { useUserteamsContext } from '../hooks/useUserteamsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import SearchBar from './SearchBar'
import DaysDropdown from './DaysDropdown'
import LoadingLogo from './LoadingLogo'
import "../styles/Userteam.css"

const UserteamForm = () => {
    const {dispatch} = useUserteamsContext()
    const {user} = useAuthContext()

    const [teamName, setTeamName] = useState('')
    const [days, setDays] = useState('')
    const [error, setError] = useState(null)
    // eslint-disable-next-line
    const [emptyFields, setEmptyFields] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [teamInputValue, setTeamInputValue] = useState('')
    const [daysInputValue, setDaysInputValue] = useState('')

    function handleteamInputValueChange(value) {
        setTeamInputValue(value);
        setTeamName(value.toString());
      }

    function handledaysInputValueChange(value) {
        setDaysInputValue(value);
        setDays(value);
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!user) {
            setError('You must be logged in')
            return 
        }

        const userteam = {teamName, days}

        const response = await fetch('/api/userteams', {
            method: 'POST',
            body: JSON.stringify(userteam),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setIsLoading(false)
            // setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTeamName('')
            setDays('')
            setError(null)
            setTeamInputValue('')
            setDaysInputValue('') 
            setIsLoading(false)
            // setEmptyFields([])
            console.log('new userteam added', json)
            dispatch({type:'CREATE_USERTEAM', payload: json})
        }
    }

    return (
        
        <form className="teamform" onSubmit={handleSubmit}>
            <label className="formlabel">Team Name:</label>
            <SearchBar inputValue={teamInputValue} value={teamInputValue} setInputValue={handleteamInputValueChange} />

            <br/>

            <label className="formlabel">Days: </label>
            <DaysDropdown inputValue={daysInputValue} value={daysInputValue} setInputValue={handledaysInputValueChange} />
            
            <br/>

            {isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <LoadingLogo/> </div> : <button className="teambutton">Add Team</button>}
            {error && <div className="error">{error}</div>}
        </form>
        
    )
}

export default UserteamForm