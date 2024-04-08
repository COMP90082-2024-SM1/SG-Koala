import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

const NavBarLayout = ({children}) => {

    const location = useLocation();
    const [ShowNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        if(location.pathname === '/login') {
            setShowNavBar(false)
        } else {
            setShowNavBar(true)
        }
    }, [location])

    return (
        <div>
            {ShowNavBar && children}
        </div>
    )
}

export default NavBarLayout