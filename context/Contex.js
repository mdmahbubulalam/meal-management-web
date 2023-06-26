import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const Provider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState([]);
    
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, Provider};
