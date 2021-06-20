import {settings, select, templates, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

const app = {

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;  // znalezienie kontenera wszystkich stron - .children obsluguje wszystkie podstrony w thissApp pages znajdąsięwszystkie dzieci kontenera stron

    thisApp.activatePage(thisApp.pages[0].id); // wydobywamy pierwszą z podstron razem z jej id
  },

  activatePage: function (pageId) {
    const thisApp = this;

    /* add class "active" to the matching pages, remove from non-matching */
    for(let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);  // toggle nadaje klasęjako pierwszy argument tj. (classNames.pages.active) jeżeli jej nie było, w przeciwnym wypadku odbiera ją
    } // pętla idzie po wszystkich stronach z kontenera thisApp.pages     // drugi warunek po przecinku kontroluje czy dana klasa będzie nadana lub nie

    
    /* add class "active" to the matching links, remove from non-matching */
  },

  initMenu: function () {

    const thisApp = this;

    console.log('thisApp.data: ', thisApp.data);

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        /* save parsedRersponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu method */
        thisApp.initMenu();

      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));

  },

  init: function () {

    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);
    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },

};

app.init();
app.initCart();