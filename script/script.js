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
            menu = document.querySelector('menu');
            
        const hendlerMenu =()=>{
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', hendlerMenu);
        menu.addEventListener('click',(event)=>{
            let target=event.target;
            if (!target.classList.contains('active-menu')){               
                hendlerMenu();
            }
        });        
    };    
    toggleMenu();

    //popup
    const togglePopUp = () =>{
        const popup=document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn=document.querySelectorAll('.popup-btn');
            
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
        
        popup.addEventListener('click', (event)=>{
            let target= event.target;
            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
                persent = 0;
            }else{
                target = target.closest('.popup-content');               
                if(target===null){
                    popup.style.display = 'none';
                    persent = 0;
                }
            }
            
        });
        
        popupBtn.forEach((elem)=>{
            elem.addEventListener('click', ()=>{
                popup.style.display='block';
                if(screen.width>768){
                     amimationInterval = setInterval(animation, 10);
                    animation();
                }
               
            });
        });
      
        
    };
    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent=document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) =>{
            for(let i=0; i<tabContent.length;i++){
                if(index===i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event)=>{
            let target=event.target;
            target=target.closest('.service-header-tab');
            
            if (target.classList.contains('service-header-tab')){
                tab.forEach((item,i)=>{
                    if(item===target){
                        toggleTabContent(i);
                    }
                });
            }
            
        });
    };
    tabs();

});