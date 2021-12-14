// get constants
const bill = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('input-tip');
const people = document.getElementById('input-people');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');

// set default values
let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

// validations
const validateFloat = (num) => {
  let rgx = /^[0-9]*\.?[0-9]*$/;  // (15.555 || 1.5 || 15), for example
  return num.match(rgx);
}

const validateInt = (num) => {
  let rgx = /^[0-9]*$/;
  return num.match(rgx);
}


// calculate tip value
const calculateTip = () => {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = billValue * (tipValue + 1) / peopleValue;
    results[0].innerHTML = `$ ${tipAmount.toFixed(2)}`;
    results[1].innerHTML = `$ ${total.toFixed(2)}`;
  } else {
    results[0].innerHTML = "0.0";
    results[1].innerHTML = "0.0";
  }
}

// callbacks
const setBillValue = () => {
  if (bill.value.includes(',')) {
    bill.value = bill.value.replace(',', '.');
  }
  if(!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length-1);
  }

  billValue = parseFloat(bill.value, 10);

  calculateTip();
}

const handleBtnTipClick = (event) => {
  tipBtns.forEach((btn) => {
    // clear active state
    btn.classList.remove('btn-active');
    // set active state
    if(event.target.innerHTML == btn.innerHTML) {
      btn.classList.add('btn-active');
      tipValue =parseFloat(btn.innerHTML, 10)/100;
    }
  });

  // clear custom tip
  tipCustom.value = '';

  calculateTip();
}

const setTipCsutomValue = () => {
  if (!validateInt(tipCustom.value)) {
    tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
  }
  tipValue = parseFloat(tipCustom.value/100, 10);

  // remove active state from btns
  tipBtns.forEach((btn) => {
    btn.classList.remove('btn-active');
  });

  if (tipCustom.value !== ''){
    calculateTip();
  }
};

const setPeopleValue = () => {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  peopleValue = parseFloat(people.value, 10);

  if(peopleValue <= 0){
    errorMsg.classList.add('show-error-msg');
  }

  calculateTip();
}

// reset option
const reset = () => {
  bill.value = '0.0';
  setBillValue();

  tipBtns[2].click();

  peopleValue = '1';
  setPeopleValue();
}

// event listeners
bill.addEventListener('input', setBillValue);
tipBtns.forEach((btn) => {
  btn.addEventListener('click', handleBtnTipClick);
});
tipCustom.addEventListener('input', setTipCsutomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);
