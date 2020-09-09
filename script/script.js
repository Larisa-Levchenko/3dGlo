window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //таймер
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        let timeinterval;

        function getZero(n) {
            if (n < 10) {
                n = '0' + n;
            }
            return n;
        }

        function getTimeREmaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24;
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            let timer = getTimeREmaining();
            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(timeinterval);
            } else {
                timerHours.textContent = getZero(timer.hours);
                timerMinutes.textContent = getZero(timer.minutes);
                timerSeconds.textContent = getZero(timer.seconds);
            }

        }
        timeinterval = setInterval(updateClock, 1000);
        updateClock();

    }
    countTimer('2 September 2020');

    //меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
            
        let top = 0,
            blockTop,
            animation;

        const hendlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        const getAnimation = () =>{
            if (top < blockTop) {
                if ((top + 40) > blockTop) {
                    top = blockTop;
                } else {
                    top = top+40;
                    animation = window.requestAnimationFrame(getAnimation);
                }                
            }           
            window.scrollTo(0, top);
            
        };

        const getScroll = (event) => {
            event.preventDefault();
            const target = event.target.closest('a');           
            const blockID = target.getAttribute('href').substr(1);            
            const block = document.getElementById(blockID);
            top = 0;
            blockTop = block.getBoundingClientRect().top;
            getAnimation();
        };

        document.body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('.menu') !== null) {
                hendlerMenu();
            } else {
                if (target.closest('menu') === null && menu.classList.contains('active-menu')) {
                    hendlerMenu();
                }
            }
            if (target.closest('menu') !== null && !target.classList.contains('active-menu')) {
                if (!target.classList.contains('close-btn') && target.closest('a') !== null) {
                    getScroll(event);
                }
                hendlerMenu();
            }
            if (target.closest('main') !== null && target.closest('a')) {
                getScroll(event);
            }
        });
    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');

        let amimationInterval;
        let persent = 0;
        popupContent.style.top = 0;

        function animation() {
            persent++;
            if (persent === 50) {
                clearInterval(amimationInterval);
            }
            popupContent.style.top = `${persent/5}%`;

        }

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
                persent = 0;
            } else {
                target = target.closest('.popup-content');
                if (target === null) {
                    popup.style.display = 'none';
                    persent = 0;
                }
            }

        });

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 768) {
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
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    };
    tabs();

    //слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        for (let i = 0; i < slide.length; i++) {
            let newElem = document.createElement('li');
            newElem.classList.add('dot');
            if (i === 0) {
                newElem.classList.add('dot-active');
            }
            dots.append(newElem);
        }
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const AutoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const StartPlaySlide = (time = 3000) => {
            interval = setInterval(AutoPlaySlide, time);
        };

        const StopPlaySlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.dot, .portfolio-btn')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.dot, .portfolio-btn')) {
                StopPlaySlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.dot, .portfolio-btn')) {
                StartPlaySlide();
            }
        });
        StartPlaySlide();
    };
    slider();

    //команда
    const command = () => {
        const command = document.querySelector('.command');
        let tmpImg;
        command.addEventListener('mouseover', (event) => {
            if (event.target.closest('.row')) {
                tmpImg = event.target.src;
                event.target.src = event.target.dataset.img;
            }
        });

        command.addEventListener('mouseout', (event) => {
            if (event.target.closest('.row')) {
                event.target.dataset.img = event.target.src;
                event.target.src = tmpImg;
            }
        });

    };
    command();
    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const inputCalc = calcBlock.querySelectorAll('input');

        const calcType = calcBlock.querySelector('.calc-type');
        const calcSquare = calcBlock.querySelector('.calc-square');
        const calcCount = calcBlock.querySelector('.calc-count');
        const calcDay = calcBlock.querySelector('.calc-day');
        const total = calcBlock.querySelector('#total');

        let animation = 0;
        let sum;

        inputCalc.forEach((item) => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/g, '');
            });
        });

        const animationSum = () => {
            if (total.textContent < sum) {
                if ((+total.textContent + 100) > sum) {
                    total.textContent = sum;
                } else {
                    total.textContent = +total.textContent + 100;
                }
                animation = window.requestAnimationFrame(animationSum);
            }

        };

        const countSum = () => {
            total.textContent = 0;
            let typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = calcSquare.value,
                countValue = 1,
                dayValue = 1;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (!!typeValue && !!squareValue) {
                sum = parseInt(price * typeValue * squareValue * countValue * dayValue);
                animationSum();
            }

        };

        calcBlock.addEventListener('change', () => {
            if (event.target.matches('select') || event.target.matches('input')) {
                countSum();
            }
        });

    };

    calc();
});