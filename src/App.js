import React, {useState,useEffect} from 'react';
import './App.css';


function App() {

 // const url = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&windspeed_unit=mph&timeformat=unixtime"

const [data,setData]= useState([])
const [current,setCurrent] = useState({})
const [lat, setLat] = useState(null);
console.log(lat)
const [lng, setLng] = useState(null);
const [status, setStatus] = useState(null);

const getLocation = () => {
  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser');
  } else {
    setStatus('Locating...');
    navigator.geolocation.getCurrentPosition((position) => {
      setStatus(null);
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }, () => {
      setStatus('Unable to retrieve your location');
    });
  }
}

useEffect(()=>{
  getLocation()
},[])

useEffect(()=>{
  const fetchData = async (lat, lon, timezone)=>{
    console.log(lat, lon, timezone)
   const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&windspeed_unit=mph&timeformat=unixtime&timezone=${timezone}`)
   const res1 = await res.json()
   setCurrent(res1.current_weather.temperature)
   console.log(res1)
  }
  fetchData(lat , lng , Intl.DateTimeFormat().resolvedOptions().timeZone)
},[lat, lng])


  return (
    <div className='container mt-5'>
<p>{status}</p>
      <h1 className='text-center'>Weather App {Math.round(current)}</h1>
    </div>
  );
}

export default App;
