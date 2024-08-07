"use client"

import Image from "next/image";
import Header from "./_components/Header";
import ReactSwitch from "react-switch";
import { useEffect, useState } from "react";
import { SiSocketdotio } from "react-icons/si";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { RiLightbulbLine } from "react-icons/ri";
import BarChart, { CurveChart } from "./_components/BarChat";
import Footer from "./_components/Footer";
import Weather from "./_components/Weather";
import useApiCall from "./_utils/api";


// export BarChart;

const Card = ({ name, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm pt-8 border border-gray-200">
      <p>{name}</p>
      <h1 className="text-2xl font-bold">{value} 
        <p className='inline text-sm'>{name === "Voltage" ? " amp" : name === "Current" ? " V" : name === "Power Consumption" ? " Kwh" : ''}</p>
      </h1>
    </div>
  );
};

const CardWithSwitch = ({ name, value, icon, onChange, index }) => {
  const isOdd = index % 2 !== 0;
  const backgroundColor = isOdd ? 'bg-[#d0e9fc]' : 'bg-gray-50';

  return (
    <div className={`${backgroundColor} p-4 rounded-2xl shadow-sm border border-gray-200`}>
      <div className="flex justify-between items-center">
        {icon ? 
          <div className="bg-gray-50 p-2 rounded-full shadow-sm">
            {icon()}
          </div>
        : null}
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
      <div className="flex flex-col justify-between mt-16">
        <p>Device</p>
        <p className="text-lg font-bold">{name}</p>
      </div>
    </div>
  );
};


export default function Home() {
  const { get, switchRelay } = useApiCall();
  const [constants, setConstants] = useState([
    { name: "Voltage", value: "25.67" },
    { name: "Current", value: "1.56" },
    { name: "Battery Percentage", value: "60%" },
    { name: "Load Percentage", value: "50%" },
    { name: "Power Consumption", value: "125" }
  ]);
  useEffect(() => {
    const fetchConstants = async () => {
      const {data} = await get("sensor");
      if(data){
        let newConstants = data.forEach((constant, index) => {
          constants[index].value = constant.value;
        });
        setConstants([...newConstants]);
      }
      else{
        console.log("Error fetching constants");
      }
      
    };

    fetchConstants(); // Initial fetch

    const intervalId = setInterval(fetchConstants, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);


  const initialSwitchConstants = [
    {
      name: "Bulb 1",
      value: false,
      icon: () => <RiLightbulbLine size={24} />
    },
    {
      name: "Bulb 2",
      value: false,
      icon: () => <RiLightbulbLine size={24} />
    },
    {
      name: "Socket 1",
      value: false,
      icon: () => <SiSocketdotio size={24} />
    },
    {
      name: "Socket 2",
      value: false,
      icon: () => <SiSocketdotio size={24} />
    }
  ];

  const data = {
    labels: [
      'Week 1', 'Week 2', 'Week 3', 'Week 4', 
      'Week 5', 'Week 6', 'Week 7', 'Week 8', 
      'Week 9', 'Week 10', 'Week 11', 'Week 12'
    ],
    datasets: [
      {
        label: 'Power Consumption',
        backgroundColor: '#d0e9fc',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40, 72, 78, 88, 95, 62],
      },
    ],
  };
  

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        barThickness: 100, // Adjust the bar thickness here
      },
    },
  };

  const [switchConstants, setSwitchConstants] = useState(initialSwitchConstants);

  const handleSwitchChange = (index) => {
    const newSwitchConstants = [...switchConstants];
    newSwitchConstants[index].value = !newSwitchConstants[index].value;
    switchRelay(`relay${index + 1}`, newSwitchConstants[index].value ? 'on' : 'off');
    setSwitchConstants(newSwitchConstants);
  };

  return (
    <main className="min-h-screen py-8 bg-white pb-24">
      <Header/>
      <section className="px-8">
        <Weather />
      </section>
      <section className="flex px-8 flex-col gap-4 mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {constants.map((constant, index) => (
            <Card key={index} name={constant.name} value={constant.value} />
          ))}
        </div>
      </section>
      <section className="flex px-8 flex-col gap-4 mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {switchConstants.map((constant, index) => (
            <CardWithSwitch 
              key={index} 
              name={constant.name} 
              value={constant.value} 
              icon={constant.icon}
              onChange={() => handleSwitchChange(index)} 
              index={index}
            />
          ))}
        </div>
      </section>
      <section className="rounded-2xl mx-8 bg-gray-50 p-4 mt-8 border border-gray-200 shadow-sm">
        <CurveChart data={data} options={options} />
      </section>
      <Footer />
    </main>
  );
}