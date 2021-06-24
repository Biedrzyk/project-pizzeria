import { templates, select, /*settings*/} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor (element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  /*getData() {
    const thisBooking = this;

    const params = {
      booking: [
        'abc = xyz',
        'lorem = ipsum',
      ],
      eventsCurrent: [

      ],
      eventsRepeat: [

      ]
    };

    //console.log('getData params', params);

    const urls = {
      bookings:      settings.db.url + '/' + settings.db.booking 
                                     + '?' + params.booking.join('&'), // adres endpointu zwracający listę rezerwacji
      eventsCurrent: settings.db.url + '/' + settings.db.event   
                                     + '?' + params.eventsCurrent.join('&'),  // zwórci listę wydarzeń jednorazowych
      eventsRepeat:  settings.db.url + '/' + settings.db.event   
                                     + '?' + params.eventsRepeat.join('&'), // zwróci listę wydarzeń cyklicznych
    };
    console.log('getData urls', urls);
  }*/

  render (element) {
    const thisBooking = this;

    const generateHTML = templates.bookingWidget();
    
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generateHTML;
    thisBooking.dom.peopleAmount = element.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = element.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = element.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = element.querySelector(select.widgets.hourPicker.wrapper);
  }

  initWidgets () {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
  }
}

export default Booking;