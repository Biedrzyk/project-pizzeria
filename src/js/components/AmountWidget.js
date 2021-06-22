import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget{  // klasa AmountWidget jest rozszerzeniem klasy BaseWidget
  constructor(element) {                // pierwsza rzecz jaką robimy w konstruktorze klasy dziedziczącej jest wywołanie konstruktora klasy nadrzędnej super();

    super(element, settings.amountWidget.defaultValue); // oznacza konstruktor klasy BaseWidget

    const thisWidget = this;

    console.log('AmountWidget: ', AmountWidget);
    console.log('constructor arguments: ', element);


    thisWidget.getElements(element);
    thisWidget.initActions();
    /*thisWidget.setValue(thisWidget.dom.input.value);  // usuwamy bo tym zajmie się teraz klasa BaseWidget
    thisWidget.setValue(settings.amountWidget.defaultValue);*/  // usuwamy bo tym zajmie się teraz klasa BaseWidget
  }

  getElements() {
    const thisWidget = this;

    /*thisWidget.dom.wrapper = element;*/ // usuwamy bo tym zajmie się teraz klasa BaseWidget
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input); // zmieniamy na thisWidget.dom.wrapper bo jest w BaseWidget jest to wrapperElement
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  setValue(value) {

    const thisWidget = this;

    const newValue = parseInt(value);


    /* TODO: Add validation */
    if (thisWidget.value !== newValue && !isNaN(newValue) && newValue >= settings.amountWidget.defaultMin && newValue <= settings.amountWidget.defaultMax) {
      thisWidget.value = newValue;
    }
    thisWidget.dom.input.value = thisWidget.value;
    thisWidget.announce();
  }

  parseValue() {


  }


  isValid() {


  }
  
  initActions() {

    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.dom.input.value);
    });
    thisWidget.dom.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.dom.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });



  }

  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default AmountWidget;