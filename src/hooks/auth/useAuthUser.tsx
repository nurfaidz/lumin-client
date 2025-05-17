// import Js Cookie
import Cookies from "js-cookie";

//  interface User 
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const useAuthUser = (): User | null => {
    // get user data from cookie
    const user = Cookies.get("user");

    // if user is not null, parse it to JSON and return it
    // if user is null, return null
    return user ? JSON.parse(user) as User : null;
}