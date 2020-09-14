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

    const modal = document.querySelector('.modal'),
        dataModal = document.querySelectorAll('[data-modal]'),
        closeModal = document.querySelector('[modal-close]');

    function showModalWindow() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
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
        if (btn.code === "Escape" && modal.classList.contains('show')) {
            closeModalFoo();
        }
    });

    // const modalTimerId = setTimeout(showModalWindow, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    class Menu {
        constructor(src, alt, title, dsc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.dsc = dsc;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chengeToUAH();

        }

        chengeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = 
                    `<img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.dsc}</div> 
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div> 
                        <div class="menu__item-total"><span>${this.price}</span>грн/день</div> 
                     </div>`;
            this.parent.append(element);
        }

    }
    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        
    ).render();
    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        19,
        '.menu .container',
        

    ).render();
    new Menu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container',
        

    ).render();

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "Загрузка",
        success: "Спасибо! Скоро мы свами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const rex = new XMLHttpRequest();
            rex.open('POST', "server.php");

            rex.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            form.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            rex.send(json);
            rex.addEventListener('load', () => {
                if (rex.status === 200) {
                    console.log(rex.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                }else{
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});