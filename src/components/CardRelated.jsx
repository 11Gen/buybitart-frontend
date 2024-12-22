import React from 'react'
import { Link } from 'react-router-dom'
import PriceLabel from './PriceLabel'

const CardRelated = ({data}) => {
  return (
    <Link to={`/shop/${data.hash}`} className='w-full h-full rounded-2xl relative overflow-hidden border-[1px] border-[#FFFFFF1A] flex flex-col justify-between gap-4 bg-[#00000027] backdrop-blur-3xl transiton-[transform] duration-300 sm:p-5 p-3.5'>
      <img src={data.image} alt="" className='w-full h-auto max-h-[355px] object-cover rounded-xl' draggable="false" />
      <h2 className='font-main font-[600] 2xl:text-xl text-base text-white text-pretty uppercase mb-1 flex flex-1'>{data.title}</h2>
      <PriceLabel price={data.price} />
    </Link>
  )
}

export default CardRelated
