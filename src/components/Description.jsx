import React from 'react'

function Description({ condition, temperature, rainChance, loading }) {
    
    const getWeatherDescription = () => {
        if (loading) return "Hinihintay ang datos ng panahon...";
        
        const temp = temperature || 0;
        
        // Generate description based on weather conditions
        if (rainChance > 80) {
            return "Huwag muna mag laba ngayon! Maulan at baka hindi matuyo ang mga damit. Maghintay nalang ng mas magandang panahon.";
        } else if (rainChance > 60) {
            return "Medyo risky mag laba ngayon. May possibility na umuulan. Kung kailangan, mag sampay sa loob o covered area.";
        } else if (rainChance > 30) {
            return "Pwede naman mag laba pero mag ingat. May konting possibility na umuulan mamaya. Monitor mo lang ang kalangitan.";
        } else if (condition === "clear" && temp > 25) {
            return "Perfect na panahon para mag laba! Maaraw at mainit kaya mabilis matutuyo ang mga damit. Go na, Love!";
        } else if (condition === "clear" && temp <= 25) {
            return "Maganda pa rin mag laba ngayon. Maaraw naman kahit medyo malamig. Matutuyo pa rin ang mga damit.";
        } else if (condition === "cloudy") {
            return "Okay lang mag laba ngayon. Maulap lang pero walang ulan. Medyo matagal lang matuyo pero safe naman.";
        } else {
            return "Pwede naman mag laba ngayon. Hindi masama ang panahon, kaya go lang kung kailangan mo na talaga.";
        }
    };

    return (
        <div className='border-[1px] border-neutral-400 w-full rounded-xl relative'>
            {/* TITLE */}
            <h1 className='text-xs md:text-sm font-semibold absolute -top-2 left-3 bg-white px-1'>PANAHON NGAYONG ARAW</h1>

            <div className="px-3 pt-4 md:pt-5 pb-3 text-center">
                {loading ? (
                    <div className="space-y-2">
                        <div className="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
                        <div className="animate-pulse bg-gray-300 h-4 w-3/4 mx-auto rounded"></div>
                        <div className="animate-pulse bg-gray-300 h-4 w-1/2 mx-auto rounded"></div>
                    </div>
                ) : (
                    <>
                        <p className='text-xs leading-relaxed'>{getWeatherDescription()}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Description