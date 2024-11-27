import React,{useState} from 'react'
import authServices from "../appwrite/auth";
import {Link , useNavigate } from "react-router-dom";
import { Input, Logo ,Button } from './index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")
    const {register,handleSubmit} = useForm()

    const create = async(data)=>{
        setError("")
        try {
            const userData = await authServices.createUserAccount(data)
            if(userData){
                const UserDataa = await authServices.getCurrentUser()
                if(UserDataa)  dispatch(login(userDataa))
                    navigate("/")
            }
        } catch (error) {
            setError(error.message)            
        }
    }
  return (
<div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        {/* this only for logo */}
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        {/* Signup h2 after that if no account then signup */}
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {/* if error then show error */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
                <Input
                label="Full Name"
                placeholder="Enter Full Name"
                {...register("name",{
                    required:true
                })}
                />
                <Input
                label="Email"
                placeholder="Enter Email"
                type="email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPattern:(value)=>{
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address"
                            }
                    }
                })}
                />

                <Input
                label="Password"
                placeholder="Enter Password"
                type="password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button 
                type="submit"
                 className="w-full"
                 >Sign Up
                 </Button>

            </div>

        </form>
    </div>

</div>

  )
}

export default SignUp