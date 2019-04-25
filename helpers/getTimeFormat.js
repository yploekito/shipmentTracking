module.exports = function displayNiceTime(date){
    // getHours returns the hours in local time zone from 0 to 23
    var hours = date.getHours()
    // getMinutes returns the minutes in local time zone from 0 to 59
    var minutes =  date.getMinutes()
    if(hours<10){
        hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString()
    }
    return hours + ':' + minutes 
  }

