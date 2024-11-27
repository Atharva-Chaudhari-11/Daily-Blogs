// it is created for the we have options of active not active for that
import React from 'react'
import { useId } from 'react'

function Select({
    label,
    options,
    className='',
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
{/* one thing here is important to know that options are in array format or there are might chances that options are not available */}
        {options?.map((option)=>(
            <option key={option} value={option}
            >{option}
            </option>
        ))}
        </select>
    </div>
  )
}
// here is the same method like input.jsx having ith th forwardRef
export default React.forwardRef(Select)