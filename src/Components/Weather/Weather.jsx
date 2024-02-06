import { useState } from 'react';
import clear from '../../assets/clear.png';
import cloud from '../../assets/cloud.png';
import drizzle from '../../assets/drizzle.png';
import rain from '../../assets/rain.png';
import snow from '../../assets/snow.png';
import wind from '../../assets/wind.png';
import humidity from '../../assets/humidity.png';
import { FaArrowUpLong } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";

const Weather = () => {

    const api_key = '02ade84871c6ffcd20a12970d576f2ab';

    const [weatherInfo, setWeatherInfo] = useState([]);
    const [wicon, setWicon] = useState(clear);
    
    
    const search = async (e) => {
        e.preventDefault();
        const location = e.target.location.value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;

        const res = await fetch(url);
        const data = await res.json();
        setWeatherInfo(data);

        if(weatherInfo?.weather[0]?.icon === '01d' || weatherInfo?.weather[0]?.icon === '01n') {
        setWicon(clear);
    } else if (weatherInfo?.weather[0]?.icon === '02d' || weatherInfo?.weather[0]?.icon === '02n') {
        setWicon(cloud);
    } else if (weatherInfo?.weather[0]?.icon === '03d' || weatherInfo?.weather[0]?.icon === '03n') {
        setWicon(drizzle);
    } else if (weatherInfo?.weather[0]?.icon === '04d' || weatherInfo?.weather[0]?.icon === '04n') {
        setWicon(drizzle);
    } else if (weatherInfo?.weather[0]?.icon === '09d' || weatherInfo?.weather[0]?.icon === '09n') {
        setWicon(rain);
    } else if (weatherInfo?.weather[0]?.icon === '10d' || weatherInfo?.weather[0]?.icon === '10n') {
        setWicon(rain);
    }  else if (weatherInfo?.weather[0]?.icon === '13d' || weatherInfo?.weather[0]?.icon === '13n') {
        setWicon(snow);
    } else {
        setWicon(clear);
    }
    }



    

    return (
        <div className='w-1/2 h-[600px] text-center bg-black mx-auto'>
            <form onSubmit={search} className='pt-5'>
                <input type="text" placeholder="Enter Your Location" className="input input-bordered input-info w-full max-w-xs" name='location' />
                <button className='btn btn-info ml-2'>Search</button>
            </form>
            <img src={wicon} className='mx-auto h-[100px] w-[100px]' alt="" />

            <h2 className='text-xl text-white'>{weatherInfo?.name}</h2>
            
            <p className='text-white'>{Math.floor(weatherInfo?.main?.temp)}° C</p>
            <p className='mb-2 text-white'>Feels Like {Math.floor(weatherInfo?.main?.feels_like)}° C</p>
            <div className='flex justify-around my-4'>
                <p className='flex text-white'><FaArrowUpLong />{Math.floor(weatherInfo?.main?.temp_max)}° C</p>
                <p className='flex text-white'><FaArrowDownLong />{Math.floor(weatherInfo?.main?.temp_min)}° C</p>
            </div>
            <div className='flex justify-around my-4'>
                <div className='flex'>
                    <img src={humidity} alt="" />
                    <p className='flex ml-4 items-center text-white'>
                        {Math.floor(weatherInfo?.main?.humidity)}%</p>
                </div>
                <div className='flex'>
                <img src={wind} alt="" />
                <p className='flex ml-4 items-center text-white'>
                    {Math.floor(weatherInfo?.wind?.speed)} Km/h</p>
                </div>
            </div>
        </div>
    );
};

export default Weather;