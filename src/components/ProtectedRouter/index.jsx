import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({children}) => {
    const { user } = useContext(UserContext);

    if(!user){
        return <Navigate to="/" replace />
    }

    return children;
}