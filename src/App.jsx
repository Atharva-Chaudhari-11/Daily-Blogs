import { useState,useEffect } from 'react'
import './App.css' 
import {useDispatch} from 'react-redux'
import authServices from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  // this is created for checking user is available or not 
  // user authentication is check here
 
  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())  // to update the state at every point
      }
    })
    .finally(()=>setLoading(false))
  },[])
  


  return !loading ? (
    <div className='bg-green-200 min-h-screen content-between flex flex-wrap'>
      <div className='w-full block'>
        <Header/>
        <main>
          {/* <Outlet/> */}
          BLOGS :  <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
  
  
}
export default App
