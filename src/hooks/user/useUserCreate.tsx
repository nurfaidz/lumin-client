import { useMutation } from "@tanstack/react-query";
import Api from "../../services/api";
import Cookies from "js-cookie";

interface UserRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export const useUserCreate = () => {
    return useMutation({
        mutationFn: async (user: UserRequest) => {
            const token = Cookies.get('token');

            console.log(token);

            const response = await Api.post('/users', user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        }
    })
}