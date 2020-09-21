// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening)

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}


//GET Route

 projectData = {};

app.get('/all', function (req, res) {
    console.log("Get request OK.");
    res.send(projectData);
    console.log(projectData);
  })


//POST Route



app.post('/addWeather', addData)

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.userResponse = request.body.userResponse;
    response.end();
    console.log(projectData)
}
