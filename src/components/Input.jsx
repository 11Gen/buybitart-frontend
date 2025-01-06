import React from 'react'

const Input = ({type, placeholder, className, id, autocomplete, defaultValue, onChange, name }) => {
  return (
    <>
      <input type={type} placeholder={placeholder} name={name} className={className} id={id} autoComplete={autocomplete} onChange={onChange} defaultValue={defaultValue} />
    </>
  )
}

export default Input
