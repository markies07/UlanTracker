import React from 'react'
import clock from '../assets/clock.svg'

function TimeFrame() {
    return (
        <div className='border-[1px] border-neutral-400 w-full  rounded-xl relative'>
            {/* TITLE */}
            <h1 className='text-xs font-semibold absolute -top-2 left-3 bg-white px-1'>ORAS NG PAG SASAMPAY</h1>

            <div className='flex p-3 justify-center items-center gap-1'>
                <img className='w-12' src={clock} alt="" />
                <p className='font-bold'>4 PM - 5 PM</p>
            </div>
        </div>
    )
}

export default TimeFrame