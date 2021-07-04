/*global Flickity */
import { templates, select } from '../settings.js';


class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initWidgets();
  }


  render(element) {
    const thisHome = this;

    const generateHTML = templates.homeWidget();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generateHTML;
    thisHome.dom.order = element.querySelector(select.home.order);
    thisHome.dom.book = element.querySelector(select.home.book);

  }

  initWidgets() {
    const thisHome = this;
    
    thisHome.element = document.querySelector('.carousel');
    thisHome.flkty = new Flickity(thisHome.element, {
      freeScroll: true,
      wrapAround: true,
      autoPlay: 4000,
      cellAlign: 'left',
      contain: true,
    });
  }

  jumpToSubpage() {
    const thisHome = this;

  }
}

export default Home;