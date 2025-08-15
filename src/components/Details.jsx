import React, { useState, useEffect } from 'react'
import sunny1 from '../assets/sunny1.svg'
import sunny2 from '../assets/sunny2.svg'
import rainy1 from '../assets/rainy1.svg'
import rainy2 from '../assets/rainy2.svg'
import night1 from '../assets/night1.svg'
import night2 from '../assets/night2.svg'
import TimeGraph from './TimeGraph'
import TimeFrame from './TimeFrame'
import Description from './Description'
import Footer from './Footer'

function Details({ condition, temperature, rainChance }) {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const [imageIndex, setImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Switch image every 30 seconds with fade effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            
            // After fade out completes, change image and fade back in
            setTimeout(() => {
                setImageIndex(prev => prev === 0 ? 1 : 0);
                setIsTransitioning(false);
            }, 500); // Half of transition duration
        }, 10000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Function to get the appropriate illustration
    const getIllustration = () => {
        // Night time (regardless of weather condition)
        if (!isDay) {
            return imageIndex === 0 ? night1 : night2;
        }
        
        // Day time - check weather conditions
        if (condition === "raining" || condition === "thunderstorm") {
            return imageIndex === 0 ? rainy1 : rainy2;
        } else {
            // Sunny/Clear or Cloudy (using sunny images for both)
            return imageIndex === 0 ? sunny1 : sunny2;
        }
    };

    return (
        <div className='bg-white px-5 text-neutral-600 rounded-t-4xl md:rounded-none -mt-8 md:mt-0 md:w-96 flex justify-start items-center h-full grow flex-col relative'>
            {/* ILLUSTRATION */}
            <div className='w-60 h-60 py-5 object-cover'>
                <img 
                    className={`w-full h-full transition-opacity duration-1000 ease-in-out ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`} 
                    src={getIllustration()} 
                    alt="Weather illustration"
                />
            </div>

            <div className='flex flex-col w-full gap-7 pb-7'>
                {/* PAG ULAN */}
                <TimeGraph rainChance={rainChance} />

                {/* ORAS NG PAG SASAMPAY */}
                <TimeFrame condition={condition} rainChance={rainChance} />

                {/* DESCRIPTION */}
                <Description condition={condition} temperature={temperature} rainChance={rainChance} />
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Details