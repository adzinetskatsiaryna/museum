// welcome slider

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const slides = document.querySelectorAll('.slide');
const dotsArr = document.querySelectorAll('.dot');
const slideNum = document.querySelector('.num-active')

let index = 0;

const activeSlideWelcome = (n) => {
    for (slide of slides) {
      slide.classList.remove('active');
    }
    slides[n].classList.add('active');
};

const activeDotWelcome = (n) => {
    for (dot of dotsArr) {
      dot.classList.remove('active');
    }
    dotsArr[n].classList.add('active');
};

const prepareCurrentSlideWelcome = (ind) => {
    slideNum.textContent = `0${ind+1}`
    activeSlideWelcome(ind);
    activeDotWelcome(ind);
};

const nextSlideWelcome = () => {
    if (index === slides.length - 1) {
      index = 0;
      prepareCurrentSlideWelcome(index);
    } else {
      index++;
      prepareCurrentSlideWelcome(index);
    }
};

const prevSlideWelcome = () => {
    if (index === 0) {
      index = slides.length - 1;
      prepareCurrentSlideWelcome(index);
    } else {
      index--;
      prepareCurrentSlideWelcome(index);
    }
  };
  
dotsArr.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
      index = indexDot;
      prepareCurrentSlideWelcome(index);
    });
});
  
nextBtn.addEventListener('click', nextSlideWelcome);
prevBtn.addEventListener('click', prevSlideWelcome);

//swiper
const swipedetect = (el)=>{

  let surface = el; // элемент по которому идет свайп 
  let startX = 0; //стартовая позиция по Х курсора
  let startY = 0; //стартовая позиция по Y курсора 
  let distX = 0; // дистанция по X 
  let distY = 0; //дистанция по Y 
  
  let startTime = 0; // начало движение ''mousedown'
  let elapsedTime = 0; // время вычисленное от начала  до конца савйпа 

  let threshold = 100; //  расстояние которое определяет происхождение савйпа
  let resttraint = 200; // угол свайпа от горизонта
  let allowedTime = 300; // время, которое должен длится свайп (не обычный клик или иное событие)

  surface.addEventListener('mousedown', function(e){
    
      startX = e.pageX; //старт 
      startY = e.pageY;
      startTime = new Date().getTime(); 
      e.preventDefault(); //останавливаем все другие взаимодействия
  });

  surface.addEventListener('mouseup', function(e){
    
      distX = e.pageX - startX; // текущее положение минус старт (расстояние пройденное)
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      
      if(elapsedTime <= allowedTime){
          if(Math.abs(distX) >= threshold && Math.abs(distY) <= resttraint){
              if(distX > 0){
                nextSlideWelcome()
                 
              }else {
                prevSlideWelcome()
              }
          }
      }
      e.preventDefault();
  }); 

  surface.addEventListener('touchstart', function(e){
      if(e.target.classList.contains('btn-wrapper')){
          if(e.target.classList.contains('btn-next')){
            nextSlideWelcome()
          } 
          else if(e.target.classList.contains('btn-prev')){
            prevSlideWelcome()
        }      
      } 
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX; //старт 
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault(); //останавливаем все другие взаимодействия
  });

  surface.addEventListener('touchmove', function(e){
      e.preventDefault(); // чтобы страница не сползала
  });

  surface.addEventListener('touchend', function(e){
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX; // текущее положение минус старт (расстояние пройденное)
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if(elapsedTime <= allowedTime){
          if(Math.abs(distX) >= threshold && Math.abs(distY) <= resttraint){
              if(distX > 0){
                nextSlideWelcome()
                  
              }else {
                prevSlideWelcome()
              }
          }
      }
      e.preventDefault();
  }); 

}

swipedetect(document.querySelector('.slider-wrapper'));




//before-after slider


const sliderBeforeAfter = document.querySelector('.slider-before-after input');
const imgExp = document.querySelector('.image-after');
const dragLine = document.querySelector('.drag-line');

sliderBeforeAfter.oninput = () => {
    let sliderVal = sliderBeforeAfter.value;
    dragLine.style.left = sliderVal + "%"
    imgExp.style.width = sliderVal + "%"
}


 /*mob menu*/

const burger = document.querySelector('.burger');
const menuMob = document.querySelector('.mob-content')

burger.addEventListener('click', function(){
  document.querySelector('.burger span').classList.toggle('active')
  menuMob.classList.toggle('animate')
  document.querySelector('.welcome-title').classList.toggle('mob-hiden')
  document.querySelector('.welcome-text').classList.toggle('mob-hiden')
  document.querySelector('.welcome-btn').classList.toggle('mob-hiden')
})
document.querySelectorAll('section').forEach(section=>{
  section.addEventListener('click', function(){
    menuMob.classList.remove('animate')
    document.querySelector('.burger span').classList.remove('active')
    document.querySelector('.welcome-title').classList.remove('mob-hiden')
    document.querySelector('.welcome-text').classList.remove('mob-hiden')
    document.querySelector('.welcome-btn').classList.remove('mob-hiden')
  })
})

 














  
  
