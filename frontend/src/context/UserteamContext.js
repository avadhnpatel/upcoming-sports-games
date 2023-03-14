import { createContext, useReducer } from "react";

export const UserteamsContext = createContext()

export const userteamsReducer = (state, action) => {
    switch(action.type){
        case 'SET_USERTEAMS':
            return {
                userteams: action.payload
            }
        case 'CREATE_USERTEAM':
            return {
                userteams: [action.payload, ...state.userteams]
            }
        case 'DELETE_USERTEAM':
            return {
                userteams: state.userteams.filter(w => w._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const UserteamsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userteamsReducer, {
        userteams: null
    })

    return (
        <UserteamsContext.Provider value={{...state, dispatch}}>
            {children}
        </UserteamsContext.Provider>
    )
}