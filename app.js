
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate ='Date:' + d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


let appid = '&appid=14128a40b90650223c8a7c10271bdf6a';

let baseURL = "http://api.openweathermap.org/data/2.5/weather?q=";



document.getElementById('generate').addEventListener('click', performAction);


function performAction(e) {


  const feelText = document.getElementById('feelings').value;
  const Cityname = document.getElementById("zip").value;
  console.log(newDate);
  console.log(Cityname);
  

  getData(baseURL, Cityname, appid)

    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);
      let newTemp = parseInt(data.main.temp - 273.15);
      console.log("newTemp",newTemp)
      postData('http://localhost:8000/addWeather', { temperature:newTemp, date: newDate, userResponse: feelText })

      updateUI()
    })
};

//POST DATA
const getData = async (baseURL, Cityname, appid) => {

  const response = await fetch(baseURL + Cityname + appid)
  console.log(response);

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};



// Async POST
const postData = async (url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {

    const newData = await response.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log('Error', error);
  }
}


const updateUI = async () => {
  const request = await fetch('http://localhost:8000/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML =allData.date;
    document.getElementById('temp').innerHTML ="Temperature:" + allData.temp;
    document.getElementById('content').innerHTML ="Feelings: " + allData.content;

  } catch (error) {
    console.log("error", error);
  }
}

