"use client";
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

type UserData = {
    email: string,
    password?: string,
}

const Form = ({type} : {type: string}) => {
  const router = useRouter();  

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
        ...prev,
        [name]: value,
    }));
  }

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/auth/${type === "Login" ? `login` : `register`}`, {
        method: "POST",
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        }),
        credentials: "include",
    });
    if(res.status != 200) return;
    router.push("/");
    } catch (error) {
        console.log(error);
    }
  }  

  return (
    <form onSubmit={handleSubmit} className='w-4/5 flex flex-col gap-5'>
        <div className="email font-poppins flex flex-col gap-2">
            <label htmlFor="email" className='text-gray-500 text-[16px]'>Email address</label>
            <input type='email' name='email' value={userData.email} placeholder='johndoe@gmail.com' onChange={(e) => handleChange(e)} className='border w-full rounded-lg px-2 py-2 font-facultyGlyphic text-[15px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-0' required/>
        </div>
        <div className="passowrd font-poppins flex flex-col gap-2">
            <label htmlFor="password" className='text-gray-500 text-[16px]'>Password</label>
            <input type='password' name='password' value={userData.password} placeholder='********' onChange={(e) => handleChange(e)} className='border w-full rounded-lg px-2 py-2 font-facultyGlyphic text-[15px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-0' required autoComplete="current-password"/>
        </div>
        <div className="button flex justify-center font-poppins">
            <button type='submit' className='flex justify-center items-center gap-3 border w-3/4 rounded-lg py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'>
                Continue
                <FaArrowRight/>
            </button>
        </div>
    </form>
  )
}

export default Form