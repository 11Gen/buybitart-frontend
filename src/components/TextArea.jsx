import React from 'react'

const TextArea = ({placeholder, className}) => {
  return (
    <>
      <textarea placeholder={placeholder} className={className} />
    </>
  )
}

export default TextArea
