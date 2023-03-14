import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import formatPhoneNumber from '../components/PhoneFormat'
import LoadingLogo from '../components/LoadingLogo'
import "../styles/Userteam.css"
import {Link} from 'react-router-dom'

const Signup = () => {
    const [phone, setPhone] = useState('') 
    const [carrier, setCarrier] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(phone, carrier, password, confirmPassword)
    }

    const handleInput = (e) => {
        // this is where we'll call the phoneNumberFormatter function
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setPhone(formattedPhoneNumber);
    };

    return (
    <div class="form-container">
        <form className = "signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Phone Number:</label>
            <input
                type="phone"
                onChange={(e) => handleInput(e)}
                value={phone}
            />
            <label>Carrier:</label>
            <select type="carrier" onChange={(e) => setCarrier(e.target.value)} value={carrier}>
                <option value="">Select a carrier</option>
                <option value="AT&T">AT&T</option>
                <option value="T-Mobile">T-Mobile</option>
                <option value="Verizon">Verizon</option>
                <option value="Sprint">Sprint</option>
                <option value="Xfinity Mobile">Xfinity Mobile</option>
                <option value="MetroPCS">MetroPCS</option>
                <option value="Boost Mobile">Boost Mobile</option>
                <option value="Cricket Wireless">Cricket Wireless</option>
                <option value="Google Fi">Google Fi</option>
                <option value="Tracfone">Tracfone</option>
            </select>
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            /> 
            <label>Confirm Password:</label>
            <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            /> 

            {isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <LoadingLogo/> </div>  : <button disabled={isLoading}>Sign up</button>}
            {error && <div className='error'>{error}</div>}
            <div class="signup-link">
                Already have an account? <Link to="/login">Log in</Link>
            </div>
            <div className="privacy-message">
                We take your privacy very seriously. We protect your password with advanced encryption techniques. <span class="lock-logo">&#x1F512;</span>
            </div>
        </form>
    </div>
    )
}

export default Signup