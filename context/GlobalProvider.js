import { createContext, useContext, useEffect, useState } from "react";
// import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     try {
    //         setIsLoggedIn(true);
    //         setUser(res);
    //     } catch (error) {
    //         console.log("error: ",error.message);
    //     }
    //     // getCurrentUser()
    //     //     .then((res) => {
    //     //         if (res) {
    //     //             // console.log("Context : ", res);
    //     //             setIsLoggedIn(true);
    //     //             setUser(res);
    //     //         } else {
    //     //             // console.log("else")
    //     //             setIsLoggedIn(false);
    //     //             setUser(null);
    //     //         }
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log("error: ",error.message);
    //     //     })
    //     //     .finally(() => {
    //     //         setIsLoading(false);
    //     //     })
    // }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;