import React from 'react'
import clock from '../assets/clock.svg'

function TimeFrame({ condition, rainChance, loading }) {
    
    const getOptimalHangingTime = () => {
        if (loading) return "Loading...";
        
        // Logic for optimal hanging time based on weather conditions
        if (rainChance > 70) {
            return "Hindi maganda mag sampay ngayon";
        } else if (rainChance > 40) {
            return "6 AM - 10 AM (Maaga)";
        } else if (condition === "clear" || condition === "sunny") {
            return "9 AM - 3 PM (Ideal)";
        } else if (condition === "cloudy") {
            return "10 AM - 4 PM (Okay lang)";
        } else {
            return "8 AM - 2 PM (Medyo okay)";
        }
    };


    return (
        <div className='border-[1px] border-neutral-400 w-full rounded-xl relative'>
            {/* TITLE */}
            <h1 className='text-xs md:text-sm font-semibold absolute -top-2 left-3 bg-white px-1'>ORAS NG PAG SASAMPAY</h1>

            <div className='flex p-3 pt-4 justify-center items-center gap-3'>
                <img className='w-12' src={clock} alt="" />
                <div className="flex flex-col items-center">
                    {loading ? (
                        <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                    ) : (
                        <p className={`font-bold text-sm text-start leading-5`}>
                            {getOptimalHangingTime()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TimeFrame