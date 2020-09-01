window.addEventListener('DOMContentLoaded',function(){
    'use strict';
    //таймер
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let timeinterval;
        
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
        timeinterval=setInterval(updateClock, 1000);
        updateClock();
            
    }
    
    countTimer('2 September 2020');
    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems=menu.querySelectorAll('ul>li');
        const hendlerMenu =()=>{
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', hendlerMenu);
        closeBtn.addEventListener('click', hendlerMenu);
        for(let i=0; i<menuItems.length;i++){          
            menuItems[i].addEventListener('click', hendlerMenu);
        }

    };
    
    toggleMenu();

    const togglePopUp = () =>{
        const popup=document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn=document.querySelectorAll('.popup-btn'),
            popupClose=document.querySelector('.popup-close');
        let amimationInterval;
        let persent = 0;
        popupContent.style.top = 0;
        function animation() { 
            persent++;            
            if(persent===50){
                clearInterval(amimationInterval);                
            }
            popupContent.style.top=`${persent/5}%`;
            
        }
        
        
        popupBtn.forEach((elem)=>{
            elem.addEventListener('click', ()=>{
                popup.style.display='block';
                if(screen.width>768){
                     amimationInterval = setInterval(animation, 10);
                    animation();
                }
               
            });
        });
        popupClose.addEventListener('click',()=>{
            popup.style.display = 'none';
            persent=0;
        });
       
        
    };
    togglePopUp();

});