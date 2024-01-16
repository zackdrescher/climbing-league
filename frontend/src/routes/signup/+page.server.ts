import { error, fail } from "@sveltejs/kit";
import * as yup from "yup";

import { signUp } from "$lib/leagueDataService"
import type { SignUp } from "$lib/types.js";


const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords do not match"),
});


/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {

        const data = Object.fromEntries(await event.request.formData());

        try {
            await schema.validate(data, { abortEarly: false });
        } catch (err) {
            const errors = err.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
            }, {});

            // console.log(errors);
            const { username, email } = data;
            return fail(422, { username, email, description: "Invalid input", errors: errors });
        }

        try {
            await signUp((({ username, email, password }) => ({ username, email, password }))(data) as SignUp);
        } catch (error) {
            console.log(error);
            return error(500, { description: "Could not connect to backend API" });
        }
    }
};