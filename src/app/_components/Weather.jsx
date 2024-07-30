"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


async function GetWeather() {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=2c2e20a2b64445c69b5103327243007&q=Ikole&aqi=no')
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.log(error)
    }
}

function Weather() {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        GetWeather().then(data => {
            setWeather(data.current)
        })
    }, [])
  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm pt-8 border border-gray-200 grid grid-flow-row grid-cols-4">
        <div className="flex flex-row gap-4">
            <img src={weather?.condition?.icon} width={50} height={50} />
            {/* <p>{weather?.condition?.text}</p> */}
            <div>
                <p>Nigeria</p>
                <h1 className="text-2xl font-bold">Ikole</h1>
            </div>
        </div>      
        <div>
            <p>Weather</p>
            <h1 className="text-2xl font-bold">{weather?.temp_c ? weather?.temp_c : 0}°<p className='inline text-sm font-normal'>c</p></h1>
        </div>        
        <div>
            <p>Humidty</p>
            <h1 className="text-2xl font-bold">{weather.humidity ? weather.humidity : 0 }<p className='inline text-sm font-normal'>%</p></h1>
        </div>        
        <div>
            <p>Wind speed</p>
            <h1 className="text-2xl font-bold">{weather.wind_kph ? weather.wind_kph : 0} <p className='inline text-sm font-normal'>km/h</p></h1>
        </div>          
    </div>
  )
}

export default Weather