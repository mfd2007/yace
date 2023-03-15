import Component from '../lib/component.js';
import store from '../store/index.js';
import * as proddb from '../lib/productdatabase.js';

export default class List extends Component {
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor(selector) {
        super({
            store,
            element: document.querySelector(selector)
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;

        // If there are no items to show, render a little status instead
        if(store.state.csaf.product_tree == null) {
          self.element.innerHTML = `
            <h2>Products</h2>
            <ul class="w3-ul">
              <li class="w3-container">
                <div class="w3-dropdown-hover">
                  <button class="w3-button w3-block w3-green">Select products</button>
                  <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" id="productListDiv">
                    <input id="product_filter" class="w3-input w3-padding" type="text" placeholder="Search..">
                    ${proddb.getProductList().map(item => {
                    return `
                        <a id="add_product" data-id=${item.id} class="w3-bar-item w3-button">${item.label}</a>
                    `
                }).join('')}
                    
              </li>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <h2>Products</h2>
            <ul class="w3-ul">
                ${store.state.csaf.product_tree.map(item => {
                    return `
                        <li class="w3-display-container">
                          ${proddb.getProductFullName(item)}
                          <button id="remove_product" class="w3-button w3-transparent w3-display-right" aria-label="Delete this item">&times</button>
                        </li>
                    `
                }).join('')}
              <li class="w3-container">
                <div class="w3-dropdown-hover">
                  <button class="w3-button w3-block w3-green">Select products</button>
                  <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" id="productListDiv">
                    <input id="product_filter" class="w3-input w3-padding" type="text" placeholder="Search..">
                     ${proddb.getProductList().map(item => {
                    return `
                        <a id="add_product" data-id=${item.id} class="w3-bar-item w3-button">${item.label}</a>
                    `
                }).join('')}
              </li>
            </ul>
        `;
        }
        // Add a submit event listener to the form and prevent it from posting back
        self.element.querySelectorAll('#add_product').forEach((button, index) => {
             button.addEventListener('click', (event) => {
                store.dispatch('addProduct', event.srcElement.dataset.id);
            });
        });
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('#remove_product').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeProduct', { index });
            });
        });
        
        self.element.querySelectorAll('#product_filter').forEach((ele, index) => {
            ele.addEventListener('keyup', (ele) => {
              var filter, a, i;
              filter = ele.target.value.toUpperCase();
              let div = document.getElementById("productListDiv");
              a = div.getElementsByTagName("a");
              for (i = 0; i < a.length; i++) {
                let txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  a[i].style.display = "";
                } else {
                  a[i].style.display = "none";
                }
              }
            });
        });
    }
};
