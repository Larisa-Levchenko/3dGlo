"use strict";
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import "fetch-polyfill";
import "dom-node-polyfills";

import countTimer from "./modules/countTimer.js";
import toggleMenu from "./modules/toggleMenu.js";
import togglePopUp from "./modules/togglePopUp.js";
import tabs from "./modules/tabs.js";
import slider from "./modules/slider.js";
import command from "./modules/command.js";
import calc from "./modules/calc.js";
import sendForm from "./modules/sendForm.js";

//таймер
countTimer("22 September 2020");

//меню
toggleMenu();

//popup
togglePopUp();

//табы
tabs();

//слайдер
slider();

//команда
command();

//калькулятор
calc();
//sendForm
sendForm();
