import { useAuthContext } from "./useAuthContext"
import { useUserteamsContext } from "./useUserteamsContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: userteamsDispatch} = useUserteamsContext()
    
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        userteamsDispatch({type: 'SET_USERTEAMS', payload: null})
    }

    return {logout}
}