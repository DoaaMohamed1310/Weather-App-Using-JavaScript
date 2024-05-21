let inputWeather=document.querySelector(".weather .input-weather")
let btntWeather=document.querySelector(".weather .btn-weather")
let weatherResult=document.querySelector(".weather .result-weather")
let temp=document.querySelector(".result-weather .weather-content .weather-text h3")
let tempText=document.querySelector(".result-weather .weather-content .weather-text p")
let imageWeather=document.querySelector(".result-weather .weather-content img")
let error=document.querySelector(".weather .not-found")


btntWeather.addEventListener("click",function(e) {
    if(inputWeather.value){
        getWeather(inputWeather.value)
    }
        e.preventDefault();
})

async function getWeather(city) {
    const apiKey="69284f6f75cf381868de7732466cc10f"
    let currentUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    let weatherDate=await fetch(`${currentUrl}`).then(response=>response.json()).then(json=>{
        if(json.cod !== "404"){
            error.style.display="none"
            setWeatherInPage(json)
        }else{
            error.style.display="block"
            weatherResult.style.display="none"
        }

    })
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let forecasDate=fetch(`${forecastUrl}`).then(response=>response.json()).then(json=>{
        createElement(json.list.slice(0,8))

    })

}

function setWeatherInPage(weatherDate){
    weatherResult.style.display="block"
    temp.innerHTML=`${Math.round(weatherDate.main.temp - 273.15)}°C`
    tempText.innerHTML=`${weatherDate.weather[0].description}`
    let icon=weatherDate.weather[0].icon
    let imgIcon=`https://openweathermap.org/img/wn/${icon}.png`
    imageWeather.src=`${imgIcon}`
    // switch (weatherDate.weather[0].main) {
    //     case "Clouds":
    //         imageWeather.src="../image/cloud.png"
    //         break;
    //     case "Clear":
    //         imageWeather.src="../image/clear.png"
    //         break;
    //     case "Rain":
    //         imageWeather.src="../image/rain.png"
    //         break;
    //     case "Mist":
    //         imageWeather.src="../image/mist.png"
    //         break;
    //     case "Snow":
    //         imageWeather.src="../image/snow.png"
    //         break;
    //     default:
    //         imageWeather.src="../image/cloud.png"
    //         break;
    // }
}

function createElement(hoursElement) {
    let divHoures=document.querySelector(".weather .result-weather .weather-houres")
    divHoures.innerHTML=""
    hoursElement.forEach(element => {
        let dateTime=new Date(element.dt * 1000)
        let houres=dateTime.getHours()
        let temperature=Math.round(element.main.temp - 273.15)
        let icon=element.weather[0].icon
        let imgIcon=`https://openweathermap.org/img/wn/${icon}.png`
        
        let box=`
        <div class="box">
        <span>${houres}:00</span>
        <img src="${imgIcon}">
        <span>${temperature}°C</span>
        </div>`
        divHoures.innerHTML+=box
    });
}
