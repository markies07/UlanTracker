import React from 'react'
import sunny1 from '../assets/sunny1.svg'
import sunny2 from '../assets/sunny2.svg'
// Add imports for other weather illustrations
// import rainy1 from '../assets/rainy1.svg'
// import rainy2 from '../assets/rainy2.svg'
// import cloudy1 from '../assets/cloudy1.svg'
// import cloudy2 from '../assets/cloudy2.svg'

import TimeGraph from './TimeGraph'
import TimeFrame from './TimeFrame'
import Description from './Description'
import Footer from './Footer'

function Details({ condition, temperature, rainChance, loading }) {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;

    // Function to get the appropriate illustration
    const getIllustration = () => {
        if (loading) return sunny2; // Default while loading
        
        // You can add your other illustrations here
        if (condition === "raining" || condition === "thunderstorm") {
            // return isDay ? rainy1 : rainy2; // Uncomment when you have these assets
            return sunny1; // Temporary fallback
        } else if (condition === "cloudy") {
            // return isDay ? cloudy1 : cloudy2; // Uncomment when you have these assets
            return sunny2; // Temporary fallback
        } else {
            // Clear weather
            return isDay ? sunny2 : sunny1;
        }
    };

    return (
        <div className='bg-white px-5 text-neutral-600 rounded-t-4xl md:rounded-none -mt-8 md:mt-0 md:w-96 flex justify-center items-center flex-col h-full relative'>
            {/* ILLUSTRATION */}
            <div className='w-60 h-60 py-5 object-cover'>
                <img className='w-full h-full' src={getIllustration()} alt="" />
            </div>

            <div className='flex flex-col w-full gap-7 pb-7'>
                {/* PAG ULAN */}
                <TimeGraph rainChance={rainChance} loading={loading} />

                {/* ORAS NG PAG SASAMPAY */}
                <TimeFrame condition={condition} rainChance={rainChance} loading={loading} />

                {/* DESCRIPTION */}
                <Description condition={condition} temperature={temperature} rainChance={rainChance} loading={loading} />
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Details