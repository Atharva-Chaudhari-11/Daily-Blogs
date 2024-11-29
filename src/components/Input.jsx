import React, { useId } from 'react'
// when we are wraaping the things inside the hook then we will use 
// this apporach
/* why we used the forwardRef() ? 
 React forwardRef allows parent components to move down (or “forward”)
 refs to their children. It gives a child component a reference to 
 DOM entity created by its parent component in React. This helps the child
 to read and modify the element from any location where it is used. 
 */
const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label
        className="inline-block mb-1 pl-1"
        htmlFor={id}
      >{label}</label>}

      <input type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border
             border-gray-200 w-full  ${className}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  )
}
)


export default Input