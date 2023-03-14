import React from "react";
import { useContactform } from '../hooks/useContactform';
import LoadingLogo from "../components/LoadingLogo";
import { useState } from "react";
import "../styles/Userteam.css"

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const {contactform, isLoading, error} = useContactform()

    const handleSubmit = async (e) => {
        setSubmitted(false)
        e.preventDefault();

        const response = await contactform(name, email, message)

        if (response){
            setName('')
            setEmail('')
            setMessage('')
            setSubmitted(true)
        }
    };

    return (
    <div class="form-container">
        <form onSubmit={handleSubmit} className="login">
                <h3>Contact Us</h3>
                    <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </label>
                    <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </label>
                    <label>
                    Message:
                    <textarea 
                        // style={{height: "160px", width:"600px"}}
                        type="message"
                        className="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </label>
                    {isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <LoadingLogo/> </div> : <button disabled={isLoading} type="submit">Submit</button>}
                    {error && <div className='error'>{error}</div>}
                    {submitted && <div className='submitted'>Message Submitted!</div>}
            </form>
    </div>
    );
}

export default Contact;