"use client"

import Image from "next/image";
import Header from "./_components/Header";
import ReactSwitch from "react-switch";
import { useState } from "react";
import { GiPlantWatering } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { RiLightbulbLine } from "react-icons/ri";
import BarChart from "./_components/BarChat";
import Footer from "./_components/Footer";


// export BarChart;

const Card = ({ name, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm pt-8 border border-gray-200">
      <p>{name}</p>
      <h1 className="text-2xl font-bold">{value}</h1>
    </div>
  );
};

const CardWithSwitch = ({ name, value, icon, onChange, index }) => {
  const isOdd = index % 2 !== 0;
  const backgroundColor = isOdd ? 'bg-[#eaf4fe]' : 'bg-gray-50';

  return (
    <div className={`${backgroundColor} p-4 rounded-xl shadow-sm border border-gray-200`}>
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
  const constants = [
    {
      name: "Power Consumption",
      value: "1,5 KWh"
    },
    {
      name: "Voltage",
      value: "12 V"
    },
    {
      name: "Current",
      value: "24 amp"
    }
  ];

  const initialSwitchConstants = [
    {
      name: "Humidifier",
      value: false,
      icon: () => <GiPlantWatering size={24}/>
    },
    {
      name: "Speaker",
      value: false,
      icon: () => <HiOutlineSpeakerphone size={24} />
    },
    {
      name: "Smart Lamp",
      value: false,
      icon: () => <RiLightbulbLine size={24} />
    },
    {
      name: "Camera",
      value: false,
      icon: () => <AiOutlineVideoCamera size={24} />
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
    setSwitchConstants(newSwitchConstants);
  };

  return (
    <main className="min-h-screen py-8 bg-white">
      <Header/>
      <section className="flex px-8 flex-col gap-4 mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="rounded-xl mx-8 bg-gray-50 p-4 mt-8">
        <BarChart data={data} options={options} />
      </section>
      <Footer />
    </main>
  );
}