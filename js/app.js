var apiKey= '4372ee354f2da2278ed2950dc4c3f288';
var url2= 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4372ee354f2da2278ed2950dc4c3f288';
var city = document.querySelector('#ciudad').value="Rosario";
var today = document.querySelector('#today');
var user = document.querySelector('#user');
var url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
var citys = document.querySelector('#citys'); 
var text = document.querySelector('#text');
var imgcity = document.querySelector('#imgcity');

var weat = document.querySelector('#weat');
var humedity = document.querySelector('#humedity');

//console.log(url+apiKey);

function queryUser (){
  fetch('https://randomuser.me/api')
  .then(res => res.json())
  .then(users => {
    console.log(users)
    user.innerHTML = `
      <img src="${users.results['0'].picture.large}" width:"50px" border-radius:"50%"></img>   
    `
  })
};
function queryApi (){
try {
  var cityList = document.querySelector('#cityList');
  var city = document.querySelector('#ciudad').value;
  cityList.innerHTML = '';
  if (city==""){
    console.log('city vacio');
    return;
  }
  var urlpro = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&include=daily&appid=4372ee354f2da2278ed2950dc4c3f288`;
  var urlweather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4372ee354f2da2278ed2950dc4c3f288`;
  var url= `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&lang=sp&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
   if ( data.cod==400 || data.cod==401 ){
      console.log("Vacio");
      alert("Ciudad no encontrada");
      return;
    }
  for (var j = 0; j < data.list.length; j++) {
    var listItem = document.createElement('li');
    console.log(listItem);
    listItem.textContent = data.list[j].name +', '+ data.list[j].sys.country;
    listItem.setAttribute("value", j ); 
    document.getElementById('citys').style.display ='block';

    cityList.append(listItem);    
  }
  // Selecciona la ciudad y carga datos columna Izquierda
  var item = document.querySelector('#cityList');
  item.addEventListener("click", function (e) {
  console.log(e.target.value);
  console.log(e.target.textContent);
  var indice = e.target.value;
  document.getElementById('citys').style.display ='none';
  //citys.removeChild(cityList);

  //var ciudad = document.querySelector('#ciudad');
  ciudad.value= e.target.textContent;
  var utcDate = data.list[indice].dt;
  var fecha = convertDate(utcDate);
  console.log("conver:  "+convertDate(utcDate));
  today.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[indice].weather['0'].icon}@4x.png"></img> 
    <p><h2 class="grados">${data.list[indice].main.temp.toFixed()} ºC</h2></p> 
    <p><h2 class="fecha">${fecha}</h2></p> 
     
  `
  weat.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[indice].weather['0'].icon}.png"></img> </p>
    <p>${data.list[indice].weather['0'].description}</p>
  `
  text.innerHTML = `
    <h2>${data.list[indice].name}, ${data.list[indice].sys.country} </h2> 
  `   
  humedity.innerHTML = `
    <h2>${data.list[indice].main.humidity} </h2> 
  `   
});
    
  })
 
} catch (err) {
    console.error(err);
}

};


// Carga por defecto
function queryDefault (){
try {
  var cityList = document.querySelector('#cityList');
  var city = document.querySelector('#ciudad').value;
  cityList.innerHTML = '';
  if (city==""){
    console.log('city vacio');
    return;
  }
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&include=daily&appid=4372ee354f2da2278ed2950dc4c3f288`;
  //var urlweather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4372ee354f2da2278ed2950dc4c3f288`;
  //var url= `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&lang=sp&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)
   if ( data.cod==400 || data.cod==401 ){
      console.log("Vacio");
      alert("Ciudad no encontrada");
      return;
    }
  for (var j = 0; j < data.list.length; j++) {
    var listItem = document.createElement('li');
    console.log(listItem);
    listItem.textContent = data.list[j].name +', '+ data.list[j].sys.country;
    listItem.setAttribute("value", j ); 
    document.getElementById('citys').style.display ='block';

    cityList.append(listItem);    
  }
  // Selecciona la ciudad y carga datos columna Izquierda
  var item = document.querySelector('#cityList');
  item.addEventListener("click", function (e) {
  console.log(e.target.value);
  console.log(e.target.textContent);
  var indice = e.target.value;
  document.getElementById('citys').style.display ='none';
  //citys.removeChild(cityList);

  //var ciudad = document.querySelector('#ciudad');
  ciudad.value= e.target.textContent;
  var utcDate = data.list[indice].dt;
  var fecha = convertDate(utcDate);
  console.log("conver:  "+convertDate(utcDate));
  today.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[indice].weather['0'].icon}@4x.png"></img> 
    <p><h2 class="grados">${data.list[indice].main.temp.toFixed()} ºC</h2></p> 
    <p><h2 class="fecha">${fecha}</h2></p> 
     
  `
  weat.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[indice].weather['0'].icon}.png"></img> </p>
    <p>${data.list[indice].weather['0'].description}</p>
  `
  text.innerHTML = `
    <h2>${data.list[indice].name}, ${data.list[indice].sys.country} </h2> 
  `   
  humedity.innerHTML = `
    <h2>${data.list[indice].main.humidity} </h2> 
  `   
});
    
  })
 
} catch (err) {
    console.error(err);
}

};

//

// Carga Inicial por defecto Rosario, AR
function queryDefault (){
  var city = document.querySelector('#ciudad').value;
  //ciudad.value= e.target.textContent;
  var url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  var urlpro = `https://api.openweathermap.org/data/2.5/onecall?lat=-32.9468&lon=-60.6393&include=daily&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(urlpro)
  .then(res => res.json())
  .then(data => {
    var utcDate = data.current.dt;
    var fecha = convertDate(utcDate);
    console.log(data)
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
      <div id="text" class="text"><h2>Rosario, AR</h2></div>
    `

  })
};

//convert date
function convertDate(UnixTime){
  var unixTimestamp = UnixTime;
  var date = new Date(unixTimestamp*1000);
  var weekday = new Array(7);
  weekday[0] = "Sunday";  
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  console.log("Unix Timestamp:",unixTimestamp)
  console.log("Date Timestamp:",date.getTime())
  var day = weekday[date.getDay()];
  var time = date.getHours()+":"+date.getMinutes().toString();
  var fecha= day+" "+time;
  return fecha;  
}
//



//debounce
//let counter = 0;
//const getSuggestions = () => {
//    //Calls API to get Data
//    console.log("Fetching Data...", counter++);
//}

const debounce = function (fn, d) {
// 
  let timer;
    return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
            fn.apply(context, args);
        }, d)
    }
}



const debounceForData = debounce(queryApi, 600);




//console.log(city.value);
queryUser ();
queryDefault ()
//consultApi();
//debounce(consultApi, 600);
//queryClima();