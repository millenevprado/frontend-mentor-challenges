// constants
const bill = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('input-tip');

// default values
let billValue = 0.0; // default value
let tipValue = 0.15; // default value -> 15% btn is active

// validations
const validateFloat = (num) => {
  let rgx = /^[0-9]*\.?[0-9]*$/;  // (15.555 || 1.5 || 15), for example
  return num.match(rgx);
}

const validateInt = (num) => {
  let rgx = /^[0-9]*$/;
  return num.match(rgx);
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
  console.log(billValue);
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
};

// event listeners
bill.addEventListener('input', setBillValue);
tipBtns.forEach((btn) => {
  btn.addEventListener('click', handleBtnTipClick);
});
tipCustom.addEventListener('input', setTipCsutomValue);
