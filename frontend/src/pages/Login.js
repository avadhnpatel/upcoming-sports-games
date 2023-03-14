import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import formatPhoneNumber from '../components/PhoneFormat'
import LoadingLogo from '../components/LoadingLogo'
import {Link} from 'react-router-dom'
import "../styles/Userteam.css"

const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(phone, password)
    }

    const handleInput = (e) => {
        // this is where we'll call the phoneNumberFormatter function
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setPhone(formattedPhoneNumber);
    };
    return (
        <div class="form-container">
            <form className = "login" onSubmit={handleSubmit}>
                <h3>Log in</h3>

                <label>Phone Number:</label>
                <input 
                    type="phone"
                    onChange={(e) => handleInput(e)}
                    value={phone}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                {isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <LoadingLogo/> </div> : <button disabled={isLoading}>Log in</button>}
                {error && <div className='error'>{error}</div>}
                <div class="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Login