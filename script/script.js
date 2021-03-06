window.addEventListener('DOMContentLoaded',function(){
    'use strict';
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getZero(n){
            if(n<10){
                n='0'+n;
            }
            return n;
        }

        function getTimeREmaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24;
                return {timeRemaining,hours, minutes,seconds};
        }
        function updateClock(){
            let timer = getTimeREmaining();
            var timeinterval = setInterval(updateClock, 1000);
           
            if (timer.timeRemaining < 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(timeinterval);
            }else{
                timerHours.textContent = getZero(timer.hours);
                timerMinutes.textContent = getZero(timer.minutes);
                timerSeconds.textContent = getZero(timer.seconds);
            }
        }
        
        updateClock();
            
    }
    countTimer('2 September 2020');
    
});