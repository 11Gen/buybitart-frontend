import React from 'react'

const Input = ({type, placeholder, className, id, autocomplete}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} className={className} id={id} autoComplete={autocomplete} />
    </>
  )
}

export default Input
