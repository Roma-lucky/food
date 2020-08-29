

window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((elem, i) => {
                if(target == elem) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    // Timer

    const deadLine = '2020-09-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / 1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60 ) % 60),
                seconds = Math.floor((t / 1000) % 60);

                return {
                    total: t,
                    d: days,
                    h: hours,
                    m: minutes,
                    s: seconds
                };

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = t.d;
            hours.innerHTML = t.h;
            minutes.innerHTML = t.m;
            seconds.innerHTML = t.s;


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    // Modal

    const   modalTrigger = document.querySelector('[data-modal]'),
            modalCloseBtn = document.querySelector('[data-close]'),
            modal = document.querySelector('.modal');


    
            // ------------------- 1 Этот отрабатывает
            modalTrigger.addEventListener('click', () => {
                modal.style.display = 'block';
                
                
        
            });
            modalCloseBtn.addEventListener('click', () => {
                modal.style.display = "none";
                
        
            });
            
            // ----------------------2 не работает. хотя до этого классы show и hide отрабатывали
            modalTrigger.addEventListener('click', () => {
                modal.classList.add('show');
                modal.classList.remove('hide');
                
        
            });
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.add('hide');
                modal.classList.remove('show');
        
            });
            

});