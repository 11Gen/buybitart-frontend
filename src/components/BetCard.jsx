import React from 'react'

const BetCard = ({data}) => {
  return (
    <div className='w-full h-[50px] flex items-center justify-between relative font-main bg-[#212121] rounded-xl py-[10px] px-3'>
        <div className='flex w-auto h-auto gap-1.5'>
            <span className='font-[300] text-white/75 leading-[19.2px] text-base'>{data.name} •</span>
            <span className='font-[400] text-white leading-[19.2px] text-base'>{data.price}</span>
        </div>
        <span className='text-[#707070] font-[300] text-base leading-[19.2px]'>{data.time}</span>
    </div>
  )
}

export default BetCard
