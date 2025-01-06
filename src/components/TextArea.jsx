import React from 'react'

const TextArea = ({placeholder, className, autocomplete, id, defaultValue, onChange, name}) => {
  return (
    <>
      <textarea placeholder={placeholder} className={className} name={name} autoComplete={autocomplete} id={id} defaultValue={defaultValue} onChange={onChange} />
    </>
  )
}

export default TextArea
