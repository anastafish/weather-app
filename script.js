const temp = document.querySelector('.temp')
const desc = document.querySelector('.desc')
const cityName = document.querySelector('.city') 
const feels = document.querySelector('.feels')
const leftImg = document.querySelector('.left-img')
const rightImg = document.querySelector('.right-img')

leftImg.src = './images/cloud.png'
rightImg.src = './images/sunny.png'

async function weatherData(city,mesure){
    try{
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${mesure}&appid=9e3b21f1026bf0f470a813919b50acc4`, {mode:'cors'})
const data = await response.json();
const temp = data.main.temp
const desc = data.weather[0].description
const city_name = data.name
const feels = data.main.feels_like
const icon = data.weather[0].icon

return{
    temp:temp,
    desc:desc,
    city:city_name,
    feels:feels,
    icon:icon
}
}
catch(err){
    cityName.textContent = "Please Enter A valid City Name!"
    desc.textContent = ""
    temp.textContent = ""
    feels.textContent = ""
}
} 

async function icons(temp, info){
const icon = document.querySelector('.temp-icon')
icon.src = `http://openweathermap.org/img/wn/${temp}@2x.png`
icon.style.display = 'block';
}

weatherData('new york', 'metric').then(data => {
    temp.textContent = `Temperature: ${data.temp}`;
        desc.textContent = `Info: ${data.desc}`;
        cityName.textContent = `City: ${data.city}`;
        feels.textContent = `Feels Like: ${data.feels}`;
        icons(data.icon)
        document.querySelector('.content').style.padding = '20px'
})

document.querySelector('.search').addEventListener('click', () => {
    const city = document.querySelector('#input').value
    const unit = document.querySelector('#mesure').value  
    weatherData(city,unit).then(data => {
        temp.textContent = `Temperature: ${data.temp}`;
        desc.textContent = `Info: ${data.desc}`;
        cityName.textContent = `City: ${data.city}`;
        feels.textContent = `Feels Like: ${data.feels}`;
        icons(data.icon)
        document.querySelector('.content').style.padding = '20px'

    })
})

document.querySelector('#mesure').addEventListener('input', () => {
    let city = document.querySelector('#input').value
    const unit = document.querySelector('#mesure').value  
    if (!city){
        city = 'new york'
    }
    weatherData(city,unit).then(data => {
        temp.textContent = `Temperature: ${data.temp}`;
        desc.textContent = `Info: ${data.desc}`;
        cityName.textContent = `City: ${data.city}`;
        feels.textContent = `Feels Like: ${data.feels}`;
        icons(data.icon)
        document.querySelector('.content').style.padding = '20px'

    })
})


