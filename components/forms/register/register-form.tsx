"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "./register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegister } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await UserRegister(data);

    if (res.status === "success") {
      router.push("/dashboard");
    }

    toast(
      res.status === "success"
        ? "Registration successful!"
        : `Registration failed: ${res.error}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-poppins mt-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="johndoe@gmail.com"
          className="px-4 py-2 border border-gray-400"
          required
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
          className="px-4 py-2 border border-gray-400"
          required
        />
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-2/4 cursor-pointer"
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default RegisterForm;
