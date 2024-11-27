import React from 'react'

// children are nothing but the text only its just a fancy word
export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className="",
    ...props  //remaining property
}) {
  return (
    <button 
    className={`px-4 py-2 bg rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props} 
    >{children}</button>
  )
}