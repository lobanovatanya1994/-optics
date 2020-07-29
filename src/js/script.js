function ibg() {
  let ibg = document.querySelectorAll(".ibg");
      for (var i = 0; i < ibg.length; i++) {
          if(ibg[i].querySelector('img')){
              ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
              }
          }
      }

ibg();

function burgerMenu () {
  const burger = document.querySelector('.icon-menu'),
        burgerMenu = document.querySelector('.menu__body');
      burger.addEventListener('click', () => {
          burger.classList.toggle('active');
          burgerMenu.classList.toggle('active');
        })
} 

burgerMenu();

function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // слайдер

  const slides = document.querySelectorAll(slide),
         slider = document.querySelector(container),
         prev = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         total = document.querySelector(totalCounter),
         current = document.querySelector(currentCounter),
         slidesWrapper = document.querySelector(wrapper),
         slidesFlied = document.querySelector(field),
         width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  function addZero () {
      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
     } else {
         current.textContent = `slideIndex`;
     }
  }

  function changeOpacity () {
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  }

    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
  } else {
      total.textContent = `slides.length`;
      current.textContent = `slideIndex`;
  }

  slidesFlied.style.width = 100 * slides.length + '%';
  slidesFlied.style.display = 'flex';
  slidesFlied.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
      slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicator = document.createElement('ol'),
        dots = [];

  indicator.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  list-style: none;
  `;
  slider.append(indicator);

  for ( let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
      box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  border-radius: 50%;
  height: 30px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #848789;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: 0.5;
  transition: opacity 0.6s ease;
      `;

      if (i == 0) {
          dot.style.opacity = 1;
      }

      indicator.append(dot);

      dots.push(dot);

  }

  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
          offset = 0;
      } else {
          offset += deleteNotDigits(width);
      }

       slidesFlied.style.transform = `translateX(-${offset}px)`;

       if (slideIndex == slides.length) {
           slideIndex = 1;
       } else {
           slideIndex ++;
       }

       addZero();

       changeOpacity();
       
       slidesFlied.style.transform = `translateX(-${offset}px)`;
  });

  prev.addEventListener('click', () => {
      if (offset == 0) {
          offset = deleteNotDigits(width) * (slides.length - 1);
          
      } else {
          offset -= deleteNotDigits(width);
      }
      if (slideIndex == 1) {
          slideIndex = slides.length;
      } else {
          slideIndex --;
      }
      addZero();

      changeOpacity();

       slidesFlied.style.transform = `translateX(-${offset}px)`;
  });  

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesFlied.style.transform = `translateX(-${offset}px)`;

      addZero();

      changeOpacity();

  });
});

}
slider({
  container: '.promo__slider',
  slide: '.promo__slide',
  nextArrow: '.promo__slider-next',
  prevArrow: '.promo__slider-prev',
  totalCounter: '#total',
  currentCounter: "#current",
  wrapper: '.promo__slider-wrapper',
  field: '.promo__slider-inner'
});

function timer (id, deadline) {
    
    //Таймер
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t/(1000 * 60 * 60* 24)),
              hours = Math.floor((t/(1000 * 60 * 60)) % 24),
              minutes = Math.floor((t/1000 / 60) % 60),
              seconds = Math.floor((t/ 1000) % 60);
    
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds' : seconds
    
    }; 
    
    }
    
    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
            }
        else {
            return num;
        }
    }
    
    function setClock (selector, endtime) {
         const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'), 
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval (upDateClock, 1000);
    
                upDateClock();    
    
    function upDateClock () {
        const t = getTimeRemaining(endtime);
        
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
      }  
    }
    
    
    setClock(id, deadline);
    }
    
    timer('.timer', '2020-08-31');

    function closeModal (modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function openModal (modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    
        console.log(modalTimerId);
        if (modalTimerId) {
            clearInterval(modalTimerId);
        }        
    }
   
    function modal (triggerSelector, modalSelector, modalTimerId) {
        //Модальное окно
    
    const  modalTrigger = document.querySelectorAll(triggerSelector),
           modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
        
    });
    
    modal.addEventListener('click', (e) =>{
        if(e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });
    
    document.addEventListener('keydown', (e) =>{
        if (e.code === 'Escape' && modal.classList.contains('show'))
        {
           closeModal(modalSelector);
        }
    });
    }

    modal('[data-modal]', '.modal', 50000);