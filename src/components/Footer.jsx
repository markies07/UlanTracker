import React from 'react'
import heart from '../assets/heart.svg'

function Footer() {
    return (
        <div className='w-full relative py-4'>
            <div className='border-t-[1px] h-1 w-full border-neutral-600' />

            <div className='absolute top-1 w-full left-0 flex justify-center'>
                <div className='bg-white justify-center gap-1 items-center flex px-2'>
                    <p className='text-xs'>made for my bebe loves yana</p>
                    <img className='w-8' src={heart} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer