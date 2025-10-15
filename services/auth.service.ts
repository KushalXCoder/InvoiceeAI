import { LoginFormData } from "../components/forms/login.schema";
import { RegisterFormData } from "../components/forms/register/register.schema";

export const UserLogin = async (data: LoginFormData) => {
    try {
        const { email, password } = data;

        const response = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
}

export const UserRegister = async (data: RegisterFormData) => {
    try {
        const { email, password } = data;

        const response = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const resData = await response.json();

        if (response.ok) {
            return resData;
        }

        return {
            error: resData.message || "Registration failed"
        };
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            error: error,
        };
    }
}