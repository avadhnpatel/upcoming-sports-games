import { UserteamsContext } from "../context/UserteamContext";
import { useContext } from "react";

export const useUserteamsContext = () => {
    const context = useContext(UserteamsContext)

    if (!context){
        throw Error('useUserteamsContext must be used inside an UserteamsContextProvider')
    }

    return context
}