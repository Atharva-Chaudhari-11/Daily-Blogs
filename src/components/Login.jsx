import React,{useState} from 'react'
// useState is used for stroing the errors
// loginm needs input,button,Logo 
import { Input,Logo,Button } from './index'
//react-hook-form
import { Link , useNavigate } from 'react-router-dom'
import {login as storeLogin} from '../store/authSlice' 
import { useDispatch } from 'react-redux'
import authServices from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // handleSubmit is not the submit function it is its property 
    // handlesubmit is event which is used to manage the all functionality which os set through the {register}.
    const {register,handleSubmit} = useForm()
    const [errors , setErrors] = useState("")

    const login = async(data) =>{
        setErrors("")
        
        try {
            //create session for userLogin
            const session = await authServices.login(data)
            //if session is created then there is user data send to store
            if(session){
                const userData =  authServices.getCurrentUser(data)
                if(userData) dispatch(storeLogin(userData))
                navigate("/")
                }       
        } catch (error) {
            setErrors(error.message)   
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
        {/* main container */}
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
           {/* Logo */}
            <div  className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                <Logo width='100%' />
                </span>                
            </div>
            {/* Signin h2 after that if no account then signup */}
            <h2 className="text-center text-2xl font-bold leading-tight">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link to="/signup"
             className="font-medium text-primary transition-all duration-200 hover:underline"
            > 
                SignUp
            </Link>   
            </p>
            {/* display errors if we have */}
            {errors && <p className='text-red-500 text-center mt-8'>{errors}</p>}
            
            {/* Now we actually create the form user email and password */}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                {/* first input */}
                <Input 
                label="Email: "
                placeholder= "Enter your email"
                type="email"
                // we need to spread the register because otherwise it wll overwrite the values or data
                // register contains {...register(key --key will be always uniques beacuse with this key it will create the fild for our data , {object which contains property}) }  }
                // {...register("email",{} )} fromat
                {...register("email" ,{
                    required:true,
                    validate:{
                        matchPattern:(value)=>{
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                        }
                    }
                })}
                />
                {/* second input */}
                <Input 
                label="Password: "
                type="password"
                placeholder= "Enter your password"
                {...register("password" , {
                    required:true,
                    // minLength:{
                    //     value:8,
                    //     message:"Password must be at least 8 characters"
                    // }
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
            </form>

        </div>
    </div>
  )
}

export default Login