
const modalButtons = document.querySelectorAll('.open-modal');
const overlay = document.querySelector('.overlay');
const closeButtons = document.querySelectorAll('.modal-close');


function openModal(e) {
    // document.getElementsByTagName("body")[0].style.overflow = 'hidden'
   let modalId = this.getAttribute('data-modal'),
   modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
   modalElem.classList.add('active');
   overlay.classList.add('active');
   e.preventDefault();
};

modalButtons.forEach(function(item){
     item.addEventListener('click', openModal)   
}); 
 
function closeModal(e) {
    // document.getElementsByTagName("body")[0].style.overflow = 'scroll'
   let parentModal = this.closest('.modal');
   parentModal.classList.remove('active');
   overlay.classList.remove('active');
   e.preventDefault();
}

closeButtons.forEach(function(item){
    item.addEventListener('click', closeModal)
 }); 


document.body.addEventListener('keyup', function (e) {
    let key = e.keyCode;
    if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    };
}, false);

overlay.addEventListener('click', function(e) {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
});


//validation 

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('e-mail');
const inputPhone = document.getElementById('phone');

let spanName = []
const createSpanName = (text)=>{ 
    if(spanName.length===0){
       const span = document.createElement('span');
       span.classList.add('invalidSpanName');
       span.textContent = text;
       spanName.push(span)
       return span
    }
    return false
}
let spanEmail = []
const createSpanEmail = (text)=>{ 
    if(spanEmail.length===0){
       const span = document.createElement('span');
       span.classList.add('invalidSpanEmail');
       span.textContent = text;
       spanEmail.push(span)
       return span
    }
    return false
}

let spanPhone = []
const createSpanPhone = (text)=>{ 
    if(spanPhone.length===0){
       const span = document.createElement('span');
       span.classList.add('invalidSpanPhone');
       span.textContent = text;
       spanPhone.push(span)
       return span
    }
    return false
}

const checkIputName = (e)=>{
    const hasCorrectSymbol =  /^[a-zA-Zа-яА-Я\s]{3,15}$/.test(inputName.value)
   
    if(hasCorrectSymbol){
                 
        let error = createSpanName('name must be between 3 and 15 characters');
        if(inputName){
            inputName.insertAdjacentElement('afterend' , error);
            inputName.classList.add('invalid'); 
        }   
       
    } else{
        const span = document.querySelector('.invalidSpanName')
        if(span){
            span.remove()
        }   
        inputName.classList.remove('invalid'); 
    }
}

inputName.addEventListener('blur', checkIputName);

const checkInputEmail = (e)=>{
    
    const hasCorrectEmail = /^([\w-\S]{3,15})@([a-zA-Z0-9]{4,})(\.[a-zA-Z]{2,})$/.test(inputEmail.value);
    if(!hasCorrectEmail){

        let error = createSpanEmail('invalid email');
        inputEmail.insertAdjacentElement('afterend', error);
        inputEmail.classList.add('invalid');  
    }
    else{
        const span = document.querySelector('.invalidSpanEmail')
        if(span){
            span.remove()
        } 
        inputEmail.classList.remove('invalid');      
    }
}

inputEmail.addEventListener('blur', checkInputEmail)

const checkInputPhone =  ()=>{
    const hasCerrectSimbolPhon = /^(\s*)?([- _():=+]?\d[- _():=+]?){1,10}(\s*)?$/.test(inputPhone.value)
     if(!hasCerrectSimbolPhon){

        let error = createSpanPhone('phone number must be no more than 10 digits');
        inputPhone.insertAdjacentElement('afterend', error);
        inputPhone.classList.add('invalid');
    }
    else{
        const span = document.querySelector('.invalidSpanPhone')
        if(span){
            span.remove()
        } 
        inputPhone.classList.remove('invalid'); 
    }
}

inputPhone.addEventListener('blur', checkInputPhone)

document.querySelector('.cards-book').addEventListener('click', function(e){
    e.preventDefault()
    let isValidPhone = checkInputPhone();
    let isValidName = checkIputName();
    let isValidEmail = checkInputEmail()
    if(isValidEmail && isValidPhone && isValidName){
        closeModal()
    }
})



const ticketsType = document.querySelectorAll('.ticket-type');
const total = document.querySelector('.ticket-total-amount');
const ticketBasic = document.querySelector('.amount18');
const ticketSenior = document.querySelector('.senior65');
const ticketsBtns = document.querySelectorAll('.tickets-btn');


let typeValue = 20;
let discount = 0.5;
let params = {};

if (localStorage.getItem('tickets')) {
  params = JSON.parse(localStorage.getItem('tickets'));
  ticketBasic.value = params.basic;
  ticketSenior.value = params.senior;
  typeValue = params.type;
  setCurrentParams();
}
function saveParams(typeTicket, basicValue, seniorValue) {
    params = {
      basic: basicValue,
      senior: seniorValue,
      type: typeTicket,
    }
    localStorage.setItem("tickets", JSON.stringify(params));
}
  
function setCurrentParams() {
    ticketsType.forEach(el => {
      if (+el.dataset.price === params.type) {
        el.setAttribute('checked', 'checked');
      } else el.removeAttribute('checked')  
    })
  }

 function setTypeValue() {
  ticketsType.forEach(el => {
    if (el.checked){
        typeValue = +el.dataset.price;
    }
    getTotalPrice();
    saveParams(typeValue, ticketBasic.value, ticketSenior.value);
  })
}
  
  function getTotalPrice() {
    total.innerHTML = typeValue * +ticketBasic.value + typeValue * discount * +ticketSenior.value;
    saveParams(typeValue, ticketBasic.value, ticketSenior.value);
  }
  getTotalPrice();
  ticketsType.forEach(el => el.addEventListener('click', setTypeValue));
  ticketsBtns.forEach(el => el.addEventListener('click', getTotalPrice));

  //Date
  
  
  function setCorrectDate() {
    const dateText = document.querySelector('.overviev-date')
    const date = document.querySelector('.datepicker-input')
    let now = new Date();
    date.min = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    date.addEventListener('change', () => {
        let val = new Date(date.value).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        if (val === 'Invalid Date') {
            dateText.textContent = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } else {
            dateText.innerHTML = val;
        }
    });
}


function setCorrectTime() {
    const time = document.querySelector('.timepicker-input');
    const timeText = document.querySelector('.overviev-time');
    time.addEventListener('change', () => {
        timeText.textContent = time.value;
    });
}

setCorrectTime()
setCorrectDate()
  
  

  

  
  