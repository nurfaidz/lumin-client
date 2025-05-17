//  import hook react
import { useContext } from "react";

//  import js-cookie
import Cookies from "js-cookie";

// impoer hook useNavigate dari react-router
import { useNavigate } from "react-router";

// import context
import { AuthContext } from "../../context/AuthContext";

// custom hook useLogoout
export const useLogout = (): (() => void) => {
    //  get setIsAuthenticated from AuthContext
    const authContext = useContext(AuthContext);

    // using null assertion because we know that authContext will always be defined
    const { setIsAuthenticated } = authContext!;

    // navigate initialize
    const navigate = useNavigate();

    // logout function
    const logout = () => {

        //  delete token and user from cookie
        Cookies.remove("token");
        Cookies.remove("user");

        // change authenticated state to false
        setIsAuthenticated(false);

        // redirect to login page
        navigate("/login");
    };

    return logout;
}