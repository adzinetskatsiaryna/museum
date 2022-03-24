const pictureInnerContainer = document.querySelector('.picture-inner-container');
const imgArray = [
    {url: './assets/img/galery/galery1.jpg', class: ["gallery-item", "square"]},
    {url: './assets/img/galery/galery2.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery3.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery4.jpg', class: ["gallery-item", "square"]},
    {url: './assets/img/galery/galery5.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery6.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery7.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery8.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery9.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery10.jpg' , class: ["gallery-item", "square"]},
    {url: './assets/img/galery/galery11.jpg', class: ["gallery-item", "square"]},
    {url: './assets/img/galery/galery12.jpg', class: ["gallery-item", "horisontale"]},
    {url: './assets/img/galery/galery13.jpg', class: ["gallery-item", "horisontale"]},
    {url: './assets/img/galery/galery14.jpg', class: ["gallery-item","verticale"]},
    {url: './assets/img/galery/galery15.jpg' , class: ["gallery-item", "square"]},
]


function renderImg(arr){
    function shuffle(array) {
     return   array.sort(() => Math.random() - 0.5);
    }
    
    shuffle(arr).map((obj, i)=>{
        let img = document.createElement('img');         
        img.src = obj.url;
        img.classList.add(...obj.class);
        img.alt = `galery-icon`;
        pictureInnerContainer.append(img);  
             
    }) 
}; 

renderImg(imgArray)

//show-img

const galerryItems = document.querySelectorAll('.gallery-item');

if(galerryItems.length > 0){
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(){
    for (let i = 0; i < galerryItems.length; i++) {
      const galeryItem = galerryItems[i];
      const animItemHeight = galeryItem.offsetHeight;
      const animItemOffset = offset(galeryItem).top;
      const animStart = 7;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight){
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        galeryItem.classList.add('gallery-item-active');
      } else {
        if(galeryItem.classList.contains('gallery-item')){
          galeryItem.classList.remove('gallery-item-active');
        }
      }
    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
}

