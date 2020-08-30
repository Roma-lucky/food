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
                if (target == elem) {
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
            minutes = Math.floor((t / 1000 / 60) % 60),
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

    const   modal = document.querySelector('.modal'),
            dataModal = document.querySelectorAll('[data-modal]'),
            closeModal = document.querySelector('[modal-close]');

    function showModalWindow() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    
    function closeModalFoo() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
    }

    dataModal.forEach(e => {
        e.addEventListener('click', showModalWindow);
    });
    closeModal.addEventListener('click', closeModalFoo);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFoo();
        }
    });
    document.addEventListener('keydown', (btn) => {
        if(btn.code === "Escape" && modal.classList.contains('show')) {
            closeModalFoo();
        }
    });

    const modalTimerId = setTimeout(showModalWindow, 3000);

    function showModalByScroll() {
        if(document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
        


});