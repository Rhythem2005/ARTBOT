import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Appcontext = createContext()

const AppcontextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setshowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    //  Load user data when token exists
    const loadUserData = async () => {
        try {
            if (token) {
                // You can add a user info endpoint later, for now just set a basic user
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                if (userData.name) {
                    setUser(userData);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //  useEffect to load user data
    useEffect(() => {
        loadUserData();
    }, [token]);

    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})
            if(data.success){
                return data.resultImage
            }else{
                toast.error(data.message)
                return null //  Return null if failed
            }
        } catch (error) {
            toast.error(error.message)
            return null //  Return null if error
        }
    }

    const value = {
        user, setUser, showLogin, setshowLogin, backendUrl, token, setToken, generateImage
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppcontextProvider
