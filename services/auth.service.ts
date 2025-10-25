import { LoginFormData } from "../components/forms/login.schema";
import { RegisterFormData } from "../components/forms/register/register.schema";

export const UserLogin = async (data: LoginFormData) => {
  try {
    const { email, password } = data;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    if (response.ok) {
      return {
        status: "success",
        ...resData,
      };
    }

    return {
      status: "error",
      error: resData.message || "Registration failed",
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      status: "error",
      error: error,
    };
  }
};

export const UserRegister = async (data: RegisterFormData) => {
  try {
    const { email, password } = data;

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    if (response.ok) {
      return {
        status: "success",
        ...resData,
      };
    }

    return {
      status: "error",
      error: resData.message || "Registration failed",
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      status: "error",
      error: error,
    };
  }
};

export const UserLogout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      credentials: 'include',
    });

    const resData = await response.json();
    console.log("Logout API Response:", resData);

    if(response.ok) {
      return { status: 'success', message: resData.message || "Logout successful" };
    }

    return {
      status: 'error',
      error: resData.message || 'Logout failed',
    };
  } catch (error) {
    console.error("Logout failed:", error);
    return {
      status: "error",
      error: error,
    };
  }
}
