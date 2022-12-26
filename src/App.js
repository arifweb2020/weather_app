import React, { useState, useEffect } from 'react';
import './App.css';
import sun from './icons/sun.png';
import smoke from './icons/smog-bolt.png';
import cloud from './icons/cloud.png';
import cloudSun from './icons/cloud-sun.png';
import showers from './icons/cloud-showers-heavy.png';
import snowflake from './icons/snowflake.svg';
import bolt from './icons/cloud-bolt.png';
import Loader from './components/loader/Loaders';
// import { ICON_MAP } from './common/iconsMap';


function App() {

  // const url = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&windspeed_unit=mph&timeformat=unixtime"



  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState({})
  const [daily, setDaily] = useState({})
  const [hourly, setHourly] = useState({})

  const hourlyArray = [hourly]
  console.log("hourlyArray", hourlyArray)

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
        alert('Allow to access your location and refresh the page');
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
        setHourly(res1?.hourly)
        setLoading(false)
      }

    }
    fetchData(lat, lng, Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [lat, lng])





  function getIconUrl(iconCode) {
    console.log(iconCode)
    return iconCode === 0 ? <img src={sun} alt='img' width='100' /> :
      iconCode === 1 ? <img src={sun} alt='img' width='100' /> :
        iconCode === 2 ? <img src={cloudSun} alt='img' width='100' /> :
          iconCode === 3 ? <img src={cloud} alt='img' width='100' /> :
            iconCode === 45 ? <img src={smoke} alt='img' width='100' /> :
              iconCode === 48 ? <img src={smoke} alt='img' width='100' /> :
                iconCode === 51 ? <img src={showers} alt='img' width='100' /> :
                  iconCode === 53 ? <img src={showers} alt='img' width='100' /> :
                    iconCode === 55 ? <img src={showers} alt='img' width='100' /> :
                      iconCode === 56 ? <img src={showers} alt='img' width='100' /> :
                        iconCode === 57 ? <img src={showers} alt='img' width='100' /> :
                          iconCode === 61 ? <img src={showers} alt='img' width='100' /> :
                            iconCode === 63 ? <img src={showers} alt='img' width='100' /> :
                              iconCode === 65 ? <img src={showers} alt='img' width='100' /> :
                                iconCode === 66 ? <img src={showers} alt='img' width='100' /> :
                                  iconCode === 67 ? <img src={showers} alt='img' width='100' /> :
                                    iconCode === 80 ? <img src={showers} alt='img' width='100' /> :
                                      iconCode === 81 ? <img src={showers} alt='img' width='100' /> :
                                        iconCode === 82 ? <img src={showers} alt='img' width='100' /> :
                                          iconCode === 71 ? <img src={snowflake} alt='img' width='100' /> :
                                            iconCode === 73 ? <img src={snowflake} alt='img' width='100' /> :
                                              iconCode === 75 ? <img src={snowflake} alt='img' width='100' /> :
                                                iconCode === 77 ? <img src={snowflake} alt='img' width='100' /> :
                                                  iconCode === 85 ? <img src={snowflake} alt='img' width='100' /> :
                                                    iconCode === 86 ? <img src={snowflake} alt='img' width='100' /> :
                                                      iconCode === 95 ? <img src={bolt} alt='img' width='100' /> :
                                                        iconCode === 96 ? <img src={bolt} alt='img' width='100' /> :
                                                          iconCode === 99 ? <img src={bolt} alt='img' width='100' /> :
                                                            <img src={sun} alt='img' width='100' />
  }


  function getSmallIconUrl(iconCode) {
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



  //const milliseconds = 1575909015000

  // const dateObject = new Date(milliseconds)

  // const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

  // dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
  // dateObject.toLocaleString("en-US", {month: "long"}) // December
  // dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
  // dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
  // dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
  // dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
  // dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
  // dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST

  const dateObject = (mils) => {
    const x = new Date(mils * 1000)
    return x.toLocaleString("en-US", { weekday: "long" })
  }


  const timeObject = (mils) => {
    const x = new Date(mils * 1000)
    return x.toLocaleString("en-US", { hour: "numeric" })
  }


  return (
    <>
      {
        loading ? <Loader /> : <div className='container mt-5'>
          {/* <h1 className='text-center'>Weather App </h1> */}

          <div className='row topContainer' >

            <div className='col-md-6 '>
              <h1 ><span>{getIconUrl(current.weathercode)} </span> {Math.round(current.temperature)}&deg;C</h1>
              <div className='headerLeft'></div>
            </div>
            <div className='col-md-2'>
              <div>
                High<br /> {Math?.round(Math?.max(...daily?.temperature_2m_max)) || "-"}
              </div>
              <div>
                Low<br /> {Math?.round(Math.min(...daily?.temperature_2m_min)) || "-"}
              </div>
            </div>
            <div className='col-md-2'>
              <div>
                FL High<br /> {Math.round(Math.max(...daily?.apparent_temperature_max)) || "-"}
              </div>
              <div>
                FL Low<br /> {Math.round(Math.min(...daily?.apparent_temperature_min)) || "-"}
              </div>
            </div>
            <div className='col-md-2'>
              <div>
                Wind<br /> {current?.windspeed} mph
              </div>

            </div>


            <div className='daily'>
              <div className='dailyImg'>
                {
                  daily?.weathercode?.map((ele) => {
                    return <div>{getSmallIconUrl(ele)}</div>
                  }
                  )

                }

              </div>

              <div className='dailyday'>
                {
                  daily?.time?.map((ele) => {
                    return <div >{dateObject(ele)}</div>
                  }
                  )
                }
              </div>

              <div className='dailyWeather'>
                {
                  daily?.temperature_2m_max?.map((ele) => {
                    return <div >{Math.round(ele)}&deg;C</div>
                  }
                  )
                }
              </div>
            </div>

          </div>


          {/* Hourly data show */}

          <div className='row mt-5 myScroll'>




            
              <div className='col-md-2 col'>
                {
                  hourly?.time?.map((ele) => {
                    return <div className='tdrow'>{dateObject(ele)}<br />
                      {timeObject(ele)}
                    </div>
                  }
                  )
                }
              </div>
              <div className='col-md-2 col'>
                {
                  hourly?.weathercode?.map((ele) => {
                    return <div className='tdrow'>{getSmallIconUrl(ele)}</div>
                  })
                }
              </div>
              <div className='col-md-2 col'>
                {
                  hourly?.temperature_2m?.map((ele) => {
                    return <div className='tdrow'><span className='drowText'>TEMP<br/>{Math.round(ele)}&deg;C</span></div>
                  })
                }
              </div>
              <div className='col-md-2 col'>
                {
                  hourly?.apparent_temperature?.map((ele) => {
                    return <div className='tdrow'><span className='drowText'>FL TEMP<br/>{Math.round(ele)}&deg;C</span></div>
                  })
                }
              </div>
              <div className='col-md-2 col'>
                {
                  hourly?.windspeed_10m?.map((ele) => {
                    return <div className='tdrow'><span className='drowText'>WIND<br/>{ele}mph</span></div>
                  })
                }
              </div>
              <div className='col-md-2 col'>
                {
                  hourly?.precipitation?.map((ele) => {
                    return <div className='tdrow'><span className='drowText'>PRECIP<br/>{ele}in</span></div>
                  })
                }
              </div>
            </div>


          </div>

        
        
        
      }
    </>

  );
}

export default App;
