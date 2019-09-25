import { settings, select } from '../settings.js';



export class AmountWidget {
  constructor(element, value = settings.amountWidget.defaultValue) {
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.value = value;
    thisWidget.initActions();
    thisWidget.announce();

    
  }

  getElements(element){
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
  }

   

  set value(value){
    const thisWidget = this;
    const newValue = parseInt(value);

    if(newValue != thisWidget.value && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax){
      thisWidget.input.value = value;
      thisWidget.announce();
    }
  }
  get value(){
    return this.input.value;
  }

  initActions(){
    const thisWidget = this;

    thisWidget.input.addEventListener('change', function() {thisWidget.value = thisWidget.input.value;});
    thisWidget.linkDecrease.addEventListener('click', function() {thisWidget.value = thisWidget.input.value - 1;});
    thisWidget.linkIncrease.addEventListener('click', function() {
      const inputValue = parseInt(thisWidget.input.value);
      thisWidget.value = inputValue + 1; });
  }
  announce(){
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}