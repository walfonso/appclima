var city = document.querySelector('#ciudad').value = "Rosario";
var today = document.querySelector('#today');
var user = document.querySelector('#user');
var citys = document.querySelector('#citys');
var text = document.querySelector('#text');
var imgcity = document.querySelector('#imgcity');
var weat = document.querySelector('#weat');
var weatone = document.querySelector('#weatone');
var humidity = document.querySelector('#humidity');
var visibility = document.querySelector('#visibility');
var sunrs = document.querySelector('#sunrs');
var windStatus = document.querySelector('#windStatus');
var uvindex = document.querySelector('#uvindex');
var airquality = document.querySelector('#airquality');

// Carga datos del usuario
function queryUser() {
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(users => {
      console.log(users)
      user.innerHTML = `
      <img src="${users.results['0'].picture.large}" width:"50px" border-radius:"50%"></img>   
    `
    })
};

// Carga Inicial por defecto Rosario, AR
function queryDefault() {
  var city = document.querySelector('#ciudad').value;
  //ciudad.value= e.target.textContent;
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  var urlpro = `https://api.openweathermap.org/data/2.5/onecall?lat=-32.9468&lon=-60.6393&include=daily&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(urlpro)
    .then(res => res.json())
    .then(data => {
      var utcDate = data.current.dt;
      var fecha = convertDate(utcDate);
      console.log(data);
      var sunr = convertTime(data.current.sunrise);
      var suns = convertTime(data.current.sunset);
      console.log("dias:" + data.daily.length);
      for (var i = 1; i < data.daily.length; i++) {
        var fec = convertDate(data.daily[i].dt);
        var day = "day" + i;
        day = document.querySelector('#day' + i);
        console.log(day);
        day.innerHTML = `
        <p class="descClima">${fec.substr(0, 3)}</p>
        <p class="descClima"><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"></p>
        <p class="descClima">${data.daily[i].temp.max.toFixed()}º ${data.daily[i].temp.min.toFixed()}º</p>
      `
      }


      today.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.current.weather['0'].icon}@4x.png"></img> 
      <p><h2 class="grados">${data.current.temp.toFixed()} ºC</h2></p> 
      <p><h2 class="fecha">${fecha}</h2></p> 
    `
      weat.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.current.weather['0'].icon}.png"></img>
      <p>${data.current.weather['0'].description}</p>
    `
     weatone.innerHTML = `
      <img src="images/rain.png"></img> 
      <p>Rain: ${data.daily['0'].pop}%</p>
    `
      imgcity.innerHTML = `
      <img src="images/rosario.jpg" />
      <div id="text" class="text"><h2>Rosario, AR</h2></div>
    `
      uvindex.innerHTML = `
      <p class="descClima text-left color-gris ">UV Index</p>
      <div>
        <img src="images/uvi.png" alt="Sunset">
      </div>
      <p class="descClima text-left font-3em" style="    padding: 20px 0; margin-bottom: 0px; text-align: center;
       padding: 20px 0; margin-bottom: 0px;">${data.current.uvi.toFixed()}</p>
     
    `
      windstatus.innerHTML = `
      <p class="descClima text-left color-gris ">Wind Status</p>
      <p class="descClima text-left font-3em" style="padding: 30px 0; margin-bottom: 0px;">${data.current.wind_speed} Km/h</p>
      <div  class="descr">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em"><img src="images/wind.png" alt="Normal"
          style="width: 25px;vertical-align: bottom;">
      </div>
    `
      sunrs.innerHTML = `
      <p class="descClima text-left color-gris ">Sunrise & Sunset</p>
      <p class="descClima text-left font-1em" style="    padding: 30px 0; margin-bottom: 0px;">
      <img src="images/sunrise.png" alt="Sunset">
      <label class="labels">${suns}</label>
      </p>
      <p class="descClima text-left font-1em" style="    padding: 30px 0; margin-bottom: 0px;">
        <img src="images/sunset.png" alt="Sunset"><label class="labels">${suns}</label></p>
    `
      humidity.innerHTML = `
      <p class="descClima text-left color-gris ">Humidity</p>
      <p class="descClima text-left font-3em" style="padding: 30px 0; margin-bottom: 0px;">${data.current.humidity.toFixed()} %</p>
      <div  class="descr">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Normal <img src="images/normal.png" alt="Normal"
          style="width: 20px;vertical-align: bottom;">
      </div>
    `
      visibility.innerHTML = `
      <p class="descClima text-left color-gris ">Visibility</p>
      <p class="descClima text-left font-3em" style="padding: 30px 0; margin-bottom: 0px;">${data.current.visibility.toFixed()} m</p>
      <div  class="descr">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Average <img src="images/triste.png" alt="Normal"
          style="width: 20px;vertical-align: bottom;">
      </div>
    `
      airquality.innerHTML = `
      <p class="descClima text-left color-gris ">Air Quality</p>
      <p class="descClima text-left font-3em" style="padding: 30px 0; margin-bottom: 0px;">${data.current.pressure} Hpa</p>
      <div  class="descr">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Unhealthy <img src="images/mal.png" alt="Normal"
        style="width: 20px;vertical-align: bottom;">
      </div>
    `
  })
};
//

// Busca por lat y lon
function queryClima(lat, lon) {
  var city = document.querySelector('#ciudad').value;
  var urlpro = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&include=daily&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(urlpro)
    .then(res => res.json())
    .then(data => {
      var utcDate = data.current.dt;
      var fecha = convertDate(utcDate);
      console.log(data);
      var sunr = convertTime(data.current.sunrise);
      var suns = convertTime(data.current.sunset);
      console.log("dias:" + data.daily.length);
      for (var i = 1; i < data.daily.length; i++) {
        var fec = convertDate(data.daily[i].dt);
        var day = "day" + i;
        day = document.querySelector('#day' + i);
        console.log(day);
        day.innerHTML = `
        <p class="descClima">${fec.substr(0, 3)}</p>
        <p class="descClima"><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"></p>
        <p class="descClima">${data.daily[i].temp.max.toFixed()}º ${data.daily[i].temp.min.toFixed()}º</p>
      `
      }


      today.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.current.weather['0'].icon}@4x.png"></img> 
      <p><h2 class="grados">${data.current.temp.toFixed()} ºC</h2></p> 
      <p><h2 class="fecha">${fecha}</h2></p> 
    `
      weat.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.current.weather['0'].icon}.png"></img> </p>
      <p>${data.current.weather['0'].description}</p>
    `
      imgcity.innerHTML = `
      <img src="images/rosario.jpg" />
      <div id="text" class="text"><h2>${city}</h2></div>
    `
      uvindex.innerHTML = `
      <p class="descClima text-left color-gris ">UV Index</p>
      <div>
        <img src="images/uvi.png" alt="Sunset">
      </div>
      <p class="descClima text-left font-3em" style="    padding: 20px 0; margin-bottom: 0px; text-align: center;
       padding: 20px 0; margin-bottom: 0px;">${data.current.uvi.toFixed()}</p>
     
    `
      windstatus.innerHTML = `
      <p class="descClima text-left color-gris ">Wind Status</p>
      <p class="descClima text-left font-3em" style="padding: 20px 0; margin-bottom: 0px;">${data.current.wind_speed} Km/h</p>
      <div class="">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em"><img src="images/wind.png" alt="Normal"
          style="width: 20px;vertical-align: bottom;">
      </div>
    `
      sunrs.innerHTML = `
      <p class="descClima text-left color-gris ">Sunrise & Sunset</p>
      <p class="descClima text-left font-1em" style="    padding: 30px 0; margin-bottom: 0px;">
      <img src="images/sunrise.png" alt="Sunset">
      <label class="labels">${suns}</label>
      </p>
      <p class="descClima text-left font-1em" style="    padding: 30px 0; margin-bottom: 0px;">
      <img src="images/sunset.png" alt="Sunset"><label class="labels">${suns}</label></p>
    `
      humidity.innerHTML = `
      <p class="descClima text-left color-gris ">Humidity</p>
      <p class="descClima text-left font-3em" style="padding: 20px 0; margin-bottom: 0px;">${data.current.humidity.toFixed()} %</p>
      <div class="">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Normal <img src="images/normal.png" alt="Normal"
          style="width: 20px;vertical-align: bottom;">
      </div>
    `
      visibility.innerHTML = `
      <p class="descClima text-left color-gris ">visibility</p>
      <p class="descClima text-left font-3em" style="    padding: 20px 0; margin-bottom: 0px;">${data.current.visibility.toFixed()} m</p>
      <div class="">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Average <img src="images/triste.png" alt="Normal"
          style="width: 20px;vertical-align: bottom;">
      </div>
    `

     airquality.innerHTML = `
      <p class="descClima text-left color-gris ">Air Quality</p>
      <p class="descClima text-left font-3em" style="padding: 20px 0; margin-bottom: 0px;">${data.current.pressure} Hpa</p>
      <div class="">
        <p style="margin-top: 0px; font-weight: 500; font-size: 1em">Unhealthy <img src="images/mal.png" alt="Normal"
        style="width: 20px;vertical-align: bottom;">
      </div>
    `
    })
};
//

function queryApi() {
  try {
    var cityList = document.querySelector('#cityList');
    var city = document.querySelector('#ciudad').value;
    cityList.innerHTML = '';
    if (city == "") {
      console.log('city vacio');
      return;
    }
    var url = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&lang=sp&appid=4372ee354f2da2278ed2950dc4c3f288`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.cod == 400 || data.cod == 401) {
          console.log("Vacio");
          alert("Ciudad no encontrada");
          return;
        }
        for (var j = 0; j < data.list.length; j++) {
          var listItem = document.createElement('li');
          console.log(listItem);
          listItem.textContent = data.list[j].name + ', ' + data.list[j].sys.country;
          listItem.setAttribute("value", j);
          document.getElementById('citys').style.display = 'block';

          cityList.append(listItem);
        }
        console.log("Estoy aca");
        var item = document.querySelector('#cityList');
        item.addEventListener("click", function (e) {
        console.log(e.target.value);
        console.log(e.target.textContent);
        var indice = e.target.value;
        document.getElementById('citys').style.display ='none';
        var ciudad = document.querySelector('#ciudad');
        ciudad.value= e.target.textContent;
        queryClima(data.list[indice].coord.lat, data.list[indice].coord.lon);
      });
    })
  } catch (err) {
    console.error(err.messaje);
  }
};


//convert date
function convertDate(UnixTime) {
  var unixTimestamp = UnixTime;
  var date = new Date(unixTimestamp * 1000);
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var day = weekday[date.getDay()];
  var time = date.getHours() + ":" + date.getMinutes().toString();
  var fecha = day + " " + time;
  return fecha;
}

//convert Time
function convertTime(UnixTime) {
  var unixTimestamp = UnixTime;
  var date = new Date(unixTimestamp * 1000);
  var time = date.getHours() + ":" + date.getMinutes().toString();
  return time;
}

// Geolocalizacion
function loadLocation () {
	//inicializamos la funcion y definimos  el tiempo maximo ,las funciones de error y exito.
	navigator.geolocation.getCurrentPosition(viewClima,ViewError,{timeout:1000});
}

//Funcion de exito
function viewClima (position) {
	var lon = position.coords.longitude;	//guardamos la longitud
	var lat = position.coords.latitude;		//guardamos la latitud
  queryClima(position.coords.latitude, position.coords.longitude);
	
}

function ViewError (error) {
	queryDefault();
}	
//

//debounce
const debounce = function (fn, d) {
  var timer;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d)
  }
}

const debounceForData = debounce(queryApi, 600);
loadLocation ();
queryUser();

setTimeout(() => {
  var mains = document.getElementById('mains');
  mains.classList.add('mains');
}, 3000);
