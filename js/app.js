var apiKey= '4372ee354f2da2278ed2950dc4c3f288';
var url2= 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=4372ee354f2da2278ed2950dc4c3f288';
var city = document.querySelector('#ciudad').value="Rosario";
var today = document.querySelector('#today');
var user = document.querySelector('#user');
var url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
var citys = document.querySelector('#citys'); 
var text = document.querySelector('#text');


var weat = document.querySelector('#weat');
var humedity = document.querySelector('#humedity');

//console.log(url+apiKey);

function consultUser (){
  fetch('https://randomuser.me/api')
  .then(res => res.json())
  .then(users => {
    console.log(users)
    user.innerHTML = `
      <img src="${users.results['0'].picture.large}" width:"50px" border-radius:"50%"></img>   
    `
  })
};
function consultApi (){
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


// Pruebas
function queryClima (){
  var city = document.querySelector('#ciudad').value;
  var url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=4372ee354f2da2278ed2950dc4c3f288`;
  var urlpro = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&include=daily&appid=4372ee354f2da2278ed2950dc4c3f288`;
  fetch(urlpro)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    today.innerHTML = `
      <p>Ciudad:${data.list['2'].name}, ${data.list['2'].sys.country} </p> 
      <p>Tiempo: <img src="https://openweathermap.org/img/wn/${data.list['2'].weather['0'].icon}@2x.png"></img> </p> 
      <br></br>
      <br></br>
      <p>Temperarura:${data.list['2'].main.temp} </p> 
      <br></br>
      <p>Temp. Máxima:${data.list['2'].main.temp_max} </p> <br>
      <p>Temp. Mínima:${data.list['2'].main.temp_min} </p>
      
    `

    
  })
};

//convert date
function convertDate(UnixTime){
  var unixTimestamp = UnixTime;
  var date = new Date(unixTimestamp*1000);
  var weekday = new Array(7);
  weekday[0] = "Sun";  
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

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



const debounceForData = debounce(consultApi, 600);




//console.log(city.value);
//consultUser ();
//consultApi();
//debounce(consultApi, 600);
queryClima();