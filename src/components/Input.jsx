import React from 'react'

const Input = ({type, placeholder, className, id}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} className={className} id={id} />
    </>
  )
}

export default Input
