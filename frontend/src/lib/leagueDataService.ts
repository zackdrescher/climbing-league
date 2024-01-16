import type { SignUp } from "./types";

const url = import.meta.env.VITE_BACKEND_API_URL;

const fetchTimeout = (url: string, options: any, timeout = 1000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

export const signUp = async (data: SignUp) => {
    return await fetchTimeout(`${url}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}