import Component from '../lib/component.js';
import store from '../store/index.js';
import * as proddb from '../lib/productdatabase.js';


export default class List extends Component {
    selector = "";
    productList = [];
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor(selector) {
        super({
            store,
            element: document.querySelector(selector),
        });
        this.selector = selector;
        
        proddb.fetchProductList().then(list => {
          this.productList = list.products;
          this.render();
        });
    }

      
  
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.element = document.querySelector(this.selector);
        
        if(self.element != null){
          // If there are no items to show, render a little status instead
          self.element.innerHTML = `
            <div class="w3-dropdown-hover">
              <button class="w3-button w3-block w3-green">Select products</button>
              <div class="w3-dropdown-content w3-bar-block w3-card w3-light-grey" id="productListDiv">
                <input id="product_filter" class="w3-input w3-padding" type="text" placeholder="Search..">
                  ${this.productList.map(item => {
                    return `
                      <a id="add_product" data-id=${item.id} class="w3-bar-item w3-button">${item.label}</a>
                    `
                  }).join('')}
                </input>
              </div>
            </div>
           `;
                           
          // Add a submit event listener to the form and prevent it from posting back
          self.element.querySelectorAll('#add_product').forEach((button, index) => {
               button.addEventListener('click', (event) => {
                 proddb.getProductDetail(event.srcElement.dataset.id).then(product => {
                   store.dispatch('addProduct', product);
                 });
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
    }
};
