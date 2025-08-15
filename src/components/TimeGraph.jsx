import React from 'react'

function TimeGraph({ rainChance, hourlyForecast, loading }) {
    // Use real hourly forecast data if available, otherwise generate fallback
    const getHourlyData = () => {
        if (hourlyForecast && hourlyForecast.length > 0) {
            // Convert format to include AM/PM
            return hourlyForecast.map(item => ({
                ...item,
                hour: item.hour.replace('A', 'AM').replace('P', 'PM')
            }));
        }
        
        // Fallback generation with more accurate logic
        const currentHour = new Date().getHours();
        const hours = [];
        
        for (let i = 0; i < 8; i++) {
            const hour = (currentHour + i) % 24;
            const shortHour = hour === 0 ? '12A' : 
                             hour < 12 ? `${hour}A` : 
                             hour === 12 ? '12P' : `${hour - 12}P`;
            
            let probability;
            if (loading) {
                probability = 0;
            } else {
                // First hour should match current rain chance exactly
                if (i === 0) {
                    probability = rainChance || 0;
                } else {
                    // Subsequent hours have realistic variations
                    const baseChance = rainChance || 0;
                    const variation = (Math.random() * 20 - 10); // ±10% variation
                    probability = Math.max(0, Math.min(100, baseChance + variation));
                }
            }
            
            hours.push({
                hour: shortHour,
                probability: Math.round(probability)
            });
        }
        
        return hours;
    };

    const hourlyData = getHourlyData();
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
                                className="bg-[#7FC2D4] w-4 rounded-t transition-all duration-300 ease-out"
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
                                {data.hour}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TimeGraph