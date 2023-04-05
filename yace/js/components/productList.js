import Component from '../lib/component.js';
import ProductSelector from './productSelector.js';
import store from '../store/index.js';
import * as ProductDatabase from '../lib/productdatabase.js';


export default class List extends Component {
    
    productSelector = new ProductSelector("#product_selector");
    
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
            <div id="product_selector"></div>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <h2>Products</h2>
            <ul class="w3-ul">
                ${ProductDatabase.getProductFullNames(store.state.csaf).map(item => { //${store.state.csaf.product_tree.map(item => {
                    return `
                        <li class="w3-display-container">
                          ${item.name}
                          <button id="remove_product" class="w3-button w3-transparent w3-display-right" aria-label="Delete this item">&times</button>
                        </li>
                    `
                }).join('')}
            </ul>
            <div id="product_selector"></div>
        `;
        }
        
        self.productSelector.render();

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
