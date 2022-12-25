import React, { useState, useEffect } from 'react';
import './App.css';
import sun from './icons/sun.svg';
import smoke from './icons/smog-bolt.svg';
import cloud from './icons/cloud.svg';
import cloudSun from './icons/cloud-sun.svg';
import showers from './icons/cloud-showers-heavy.svg';
import snowflake from './icons/snowflake.svg';
import bolt from './icons/cloud-bolt.svg';
// import { ICON_MAP } from './common/iconsMap';


function App() {

  // const url = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&windspeed_unit=mph&timeformat=unixtime"



  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState({})
  const [daily, setDaily] = useState({})
  console.log("daily ", daily)

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        alert('Unable to retrieve your location');
      });
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    const fetchData = async (lat, lon, timezone) => {
      console.log(lat, lon, timezone)
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&windspeed_unit=mph&timeformat=unixtime&timezone=${timezone}`)
      const res1 = await res.json()
      if (current && res1.current_weather) {
        setCurrent(res1?.current_weather)
        setDaily(res1?.daily)
        setLoading(false)
      }

    }
    fetchData(lat, lng, Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [lat, lng])





  function getIconUrl(iconCode) {
    console.log(iconCode)
    return iconCode === 0 ? <img src={sun} alt='img' width='50' /> :
      iconCode === 1 ? <img src={sun} alt='img' width='50' /> :
        iconCode === 2 ? <img src={cloudSun} alt='img' width='50' /> :
          iconCode === 3 ? <img src={cloud} alt='img' width='50' /> :
            iconCode === 45 ? <img src={smoke} alt='img' width='50' /> :
              iconCode === 48 ? <img src={smoke} alt='img' width='50' /> :
                iconCode === 51 ? <img src={showers} alt='img' width='50' /> :
                  iconCode === 53 ? <img src={showers} alt='img' width='50' /> :
                    iconCode === 55 ? <img src={showers} alt='img' width='50' /> :
                      iconCode === 56 ? <img src={showers} alt='img' width='50' /> :
                        iconCode === 57 ? <img src={showers} alt='img' width='50' /> :
                          iconCode === 61 ? <img src={showers} alt='img' width='50' /> :
                            iconCode === 63 ? <img src={showers} alt='img' width='50' /> :
                              iconCode === 65 ? <img src={showers} alt='img' width='50' /> :
                                iconCode === 66 ? <img src={showers} alt='img' width='50' /> :
                                  iconCode === 67 ? <img src={showers} alt='img' width='50' /> :
                                    iconCode === 80 ? <img src={showers} alt='img' width='50' /> :
                                      iconCode === 81 ? <img src={showers} alt='img' width='50' /> :
                                        iconCode === 82 ? <img src={showers} alt='img' width='50' /> :
                                          iconCode === 71 ? <img src={snowflake} alt='img' width='50' /> :
                                            iconCode === 73 ? <img src={snowflake} alt='img' width='50' /> :
                                              iconCode === 75 ? <img src={snowflake} alt='img' width='50' /> :
                                                iconCode === 77 ? <img src={snowflake} alt='img' width='50' /> :
                                                  iconCode === 85 ? <img src={snowflake} alt='img' width='50' /> :
                                                    iconCode === 86 ? <img src={snowflake} alt='img' width='50' /> :
                                                      iconCode === 95 ? <img src={bolt} alt='img' width='50' /> :
                                                        iconCode === 96 ? <img src={bolt} alt='img' width='50' /> :
                                                          iconCode === 99 ? <img src={bolt} alt='img' width='50' /> :
                                                            <img src={sun} alt='img' width='50' />
  }

  return (
    <>
      {
        loading ? "plz wait" : <div className='container mt-5'>
          <h1 className='text-center'>Weather App </h1>
          <div>
            <h1 className='text-center'><span>{getIconUrl(current.weathercode)} </span> {Math.round(current.temperature) || "loading.."}&deg;</h1>
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <div>
                High<br /> {Math?.round(Math?.max(...daily?.temperature_2m_max)) || "-"}
              </div>
              <div>
                Low<br /> {Math?.round(Math.min(...daily?.temperature_2m_min)) || "-"}
              </div>
            </div>
            <div className='col-md-3'>
              <div>
                FL High<br /> {Math.round(Math.max(...daily?.apparent_temperature_max)) || "-"}
              </div>
              <div>
                FL Low<br /> {Math.round(Math.min(...daily?.apparent_temperature_min)) || "-"}
              </div>
            </div>
            <div className='col-md-3'>
              <div>
                Wind<br /> {current?.windspeed} mph
              </div>

            </div>
          </div>

        </div>
      }
    </>

  );
}

export default App;
