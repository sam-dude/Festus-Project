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


const generateDailyData = (numDays) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const labels = [];
  const data = [];

  for (let i = 0; i < numDays; i++) {
    labels.push(daysOfWeek[i % 7]);
    // Generate realistic power consumption values between 50 and 100
    data.push(Math.floor(Math.random() * 51) + 50);
  }

  return { labels, data };
};

const Card = ({ name, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm pt-8 border border-gray-200">
      <p>{name}</p>
      <h1 className="text-2xl font-bold">{value}
        <p className='inline text-sm'>{name === "Voltage" ? " V" : name === "Current" ? " amp" : name === "Power Consumption" ? " Kwh" : ''}</p>
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
    { name: "Voltage", value: "-" },
    { name: "Current", value: "-" },
    { name: "Battery Percentage", value: "-" },
    { name: "Load Percentage", value: "-" },
    { name: "Power Consumption", value: "-" }
  ]);

  useEffect(() => {
    const fetchConstants = async () => {
      const { data } = await get("sensor");
      if (data) {
        const newConstants = constants.map((constant) => {
          let newValue;
          switch (constant.name) {
            case "Voltage":
              newValue = data.Voltage;
              break;
            case "Current":
              newValue = data.Current;
              break;
            case "Battery Percentage":
              newValue = data.batteryPercentage;
              break;
            case "Load Percentage":
              newValue = data.loadPercentage;
              break;
            case "Power Consumption":
              newValue = data.powerConsumption;
              break;
            default:
              newValue = constant.value;
          }
          return {
            ...constant,
            value: newValue
          };
        });
        setConstants(newConstants);
      } else {
        console.log("Error fetching constants");
        setConstants([
          { name: "Voltage", value: "-" },
          { name: "Current", value: "-" },
          { name: "Battery Percentage", value: "-" },
          { name: "Load Percentage", value: "-" },
          { name: "Power Consumption", value: "-" }
        ])
      }
    };

    fetchConstants();

    const intervalId = setInterval(fetchConstants, 3000); // Fetch every 60 seconds

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

  const { labels, data } = generateDailyData(7); // Generate data for 14 days
  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: 'Power Consumption',
        backgroundColor: '#d0e9fc',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };   
  

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
      x: {
        barThickness: 1000, // Adjust the bar thickness here
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
      <Header />
      <section className="px-8">
        <Weather />
      </section>
      <section className="flex px-8 flex-col gap-4 mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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
        <CurveChart data={dataForChart} options={options} />
      </section>
      <Footer />
    </main>
  );
}