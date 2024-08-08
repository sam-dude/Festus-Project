"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactSwitch from "react-switch";
import useApiCall from "../_utils/api";

async function GetWeather() {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=2c2e20a2b64445c69b5103327243007&q=Ikole&aqi=no')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

function Weather() {
    const [weather, setWeather] = useState({})
    const { switchRelay } = useApiCall();
    useEffect(() => {
        const fetchWeather = async () => {
            const data = await GetWeather();
            setWeather(data?.current);
        };

        fetchWeather(); // Initial fetch

        const intervalId = setInterval(fetchWeather, 60000); // Fetch every 60 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const [value, setValue] = useState(false);
    const onChange = () => {
        setValue(!value)
        switchRelay(`relay5`, !value ? 'on' : 'off');
    }
    
    return (
        <div className="bg-gray-50 p-4 rounded-2xl shadow-sm pt-8 border border-gray-200 grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-row gap-4 items-center">
                <img src={weather?.condition?.icon} width={50} height={50} />
                <div className="flex flex-col justify-start">
                    <p>Nigeria</p>
                    <h1 className="text-2xl font-bold">Ikole</h1>
                </div>
            </div>
            <div>
                <p>Weather</p>
                <h1 className="text-2xl font-bold">{weather?.condition?.text ? weather?.condition?.text : "-"}</h1>
            </div>
            <div>
                <p>Humidity</p>
                <h1 className="text-2xl font-bold">{weather?.humidity ? weather.humidity : 0}<p className='inline text-sm font-normal'>%</p></h1>
            </div>
            <div>
                <p className="font-bold">Inverter</p>
                <div  className="mt-2">
                    <ReactSwitch
                        checked={value} 
                        onChange={onChange}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={24}
                        width={48}
                        handleDiameter={20}
                        onColor="#27394d"
                    />
                </div>
            </div>
        </div>
    )
}

export default Weather