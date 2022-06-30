$(document).ready(function() {
    var lat,lon;
    var api = "https://api.openweathermap.org/data/2.5/weather?";
    var units = "&units=metric";
    var appid = "&APPID=c0ef54bd8cb70c355dc7810f8ed32926";
    var isFahrenheit = false;
    
    $.getJSON('https://ipinfo.io', function(data){ 
      var res = data.loc.split(",");
      lat = res[0];
      lon = res[1];
      
      var link = api +"lat="+lat+"&lon="+lon + units + appid;
      
        $.getJSON(link, function(weather){
          $('.city').html(weather.name +" , "+ weather.sys.country); 
          $('.icon').attr('src','http://openweathermap.org/img/w/' 
                          + weather.weather[0].icon + '.png');
          $('.temp').html(weather.main.temp); 
          $('.sky').html(weather.weather[0].main + " , "+weather.weather[0].description); 
         
          
          $("#js-toggle-unit").click(function(ev) {
            isFahrenheit = !isFahrenheit;
            if (isFahrenheit) {
              $(".temp-unit").html("F");
              if (ev) {ev.target.innerHTML = 'Celsius';}
              $(".temp").html(Math.round(weather.main.temp * 1.8 + 32));
            } else {
              $(".temp-unit").html('&deg;C');
              if (ev) {ev.target.innerHTML = 'Fahrenheit';}
              $(".temp").html(weather.main.temp );
            }
          });
  
        });
      
    });
  });