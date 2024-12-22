import React from 'react'

const TextArea = ({placeholder, className, autocomplete, id}) => {
  return (
    <>
      <textarea placeholder={placeholder} className={className} autoComplete={autocomplete} id={id} />
    </>
  )
}

export default TextArea
