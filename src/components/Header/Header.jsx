import React from 'react'
import { Container , Logo , LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


/* 
{simply put, useNavigate is used to programmatically redirect to 
certain URL based on a event or a condition, while Link is more like 
React version of HTML a tag, which redirects to specified URL based on 
onClick event.} 
*/


function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
// it is used  because whne we have to add new feature then we will add easily by add in this object
// slug is url we can name anything for that

//Link and navigate are work in same ways 

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true,
    },
    {
      name:"Login",
      slug:"/Login",
      active: !authStatus,
    },
    {
      name:"SignUp",
      slug:"/SignUp",
      active:!authStatus,
    },
    {
      name:"All post",
      slug:"/all-posts",
      active:authStatus ,
    },
    {
      name:"Add post",
      slug:"/add-post",
      active:authStatus ,
    }
  ]

  return (
    <header  className='py-3 shadow bg-gray-500'>
      <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <Link to='/'>
            <Logo width='70px'/>
          </Link>
        </div>
            {/* we will add the ***keys*** on the things which are on only repeatating part */}
        <ul className='flex ml-auto'>
          {navItems.map((item)=> item.active? (
            <li key={item.name}>
             <button 
             onClick={()=>navigate(item.slug)}  
             className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
             >{item.name}</button>
            </li>
          ) : null )}

          {/* add the logout button in one of the famouse syntax which is (
          {Loutout && ()} in this if loutout is true then it will run the () this part
          
          ) */}
          {authStatus && (
            <li>
              <LogoutBtn/>
            </li>
          )}

        </ul>
      </nav>
      </Container>
    </header>
  )
}

export default Header