import { useMutation } from "@tanstack/react-query";

import Api from "../../services/api";

// interface for login
interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = () => {
    return useMutation({
        // mutation for login
        mutationFn: async (data: LoginRequest) => {

            // using service api for login
            const response = await Api.post("/api/login",data);

            // return response data
            return response.data;
        }
    })
}