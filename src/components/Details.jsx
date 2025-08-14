import React from 'react'
import sunny1 from '../assets/sunny1.svg'
import sunny2 from '../assets/sunny2.svg'
import TimeGraph from './TimeGraph'
import TimeFrame from './TimeFrame'
import Description from './Description'
import Footer from './Footer'

function Details() {
    return (
        <div className='bg-white px-5 text-neutral-600 rounded-t-4xl md:rounded-none -mt-8 md:mt-0 md:w-96 flex justify-center items-center flex-col relative'>
            {/* ILLUSTRATION */}
            <div className='w-60 h-60 py-5 object-cover'>
                <img className='w-full h-full' src={sunny2} alt="" />
            </div>

            <div className='flex flex-col w-full gap-7 pb-7'>
                {/* PAG ULAN */}
                <TimeGraph />

                {/* ORAS NG PAG SASAMPAY */}
                <TimeFrame />

                {/* DESCRIPTION */}
                <Description />
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Details