import React from 'react'

function TimeGraph({ rainChance, loading }) {
    // Generate sample hourly data (you can replace this with real forecast data)
    const generateHourlyData = () => {
        const currentHour = new Date().getHours();
        const hours = [];
        
        for (let i = 0; i < 8; i++) {
            const hour = (currentHour + i) % 24;
            const displayHour = hour === 0 ? '12 AM' : 
                               hour < 12 ? `${hour} AM` : 
                               hour === 12 ? '12 PM' : `${hour - 12} PM`;
            
            // Generate some sample rain probabilities (you can replace with real API data)
            let probability;
            if (loading) {
                probability = 0;
            } else {
                // Create a pattern around the current rainChance
                const variation = Math.random() * 20 - 10; // ±10% variation
                probability = Math.max(0, Math.min(100, (rainChance || 0) + variation));
            }
            
            hours.push({
                hour: displayHour,
                shortHour: hour === 0 ? '12AM' : 
                          hour < 12 ? `${hour}AM` : 
                          hour === 12 ? '12PM' : `${hour - 12}PM`,
                probability: Math.round(probability)
            });
        }
        
        return hours;
    };

    const hourlyData = generateHourlyData();
    const maxHeight = 60; // Maximum bar height in pixels

    return (
        <div className='border-[1px] border-neutral-400 w-full rounded-xl relative p-3 pt-11'>
            {/* TITLE */}
            <h1 className='text-xs font-semibold absolute -top-2 left-3 bg-white px-1'>PAG ULAN</h1>
            
            {loading ? (
                <div className="flex justify-center items-center h-20">
                    <div className="animate-pulse text-sm text-gray-400">Loading rain data...</div>
                </div>
            ) : (
                <div className="flex justify-between items-end h-20">
                    {hourlyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center gap-1 flex-1">
                            {/* Rain probability bar */}
                            <div 
                                className="bg-[#7FC2D4] w-4 rounded-t transition-all duration-500 ease-out"
                                style={{ 
                                    height: `${(data.probability / 100) * maxHeight}px`,
                                    minHeight: data.probability > 0 ? '2px' : '0px'
                                }}
                            />
                            {/* Percentage label */}
                            <span className="text-[10px] text-gray-600 font-medium">
                                {data.probability}%
                            </span>
                            <div className='bg-neutral-400 h-[1px] w-full'></div>
                            {/* Time label */}
                            <span className="text-xs font-medium">
                                {data.shortHour}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TimeGraph