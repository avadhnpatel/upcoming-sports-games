import {useState} from 'react'

export const useContactform = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const contactform = async(name, email, message) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/contactform/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, message})
        })
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
            return false
        }
        if (response.ok) {
            setIsLoading(false)
            return true
        }
    }
    return {contactform, isLoading, error}
} 