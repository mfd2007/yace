import Component from '../lib/component.js';
import store from '../store/index.js';
import * as proddb from '../lib/productdatabase.js';

export default class ReferencesList extends Component {
    
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
        if(store.state.csaf?.document?.references == undefined) {
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>References</h2></li>
              <li>
                <button id="add_reference" class="w3-button w3-block w3-green">Add reference</button>
              </li>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>Revision</h2></li>
                ${store.state.csaf?.document?.references.map((referenceItem, index) => {
                    return `
                        <li class="w3-container">
                          <div class="w3-row">
                            <label for="document.references.${index}.summary">summary</label>
                            <input class="w3-input" id="document.references.${index}.summary" type="text" value="${(referenceItem.summary != undefined) ? referenceItem.summary:''}" />
                            <label for="document.references.${index}.url">URL</label>
                            <input class="w3-input" id="document.references.${index}.url" type="text" value="${(referenceItem.url != undefined) ? referenceItem.url:''}" />
                            <label for="document.references.${index}.category">category</label>
                            <select id="document.references.${index}.category" class="w3-select">
                              <option value="">Choose your option</option>
                              <option value="self" ${(referenceItem?.category != undefined && referenceItem?.category == "self")?'selected':''}>self</option>
                              <option value="external" ${(referenceItem?.category != undefined && referenceItem?.category == "external")?'selected':''}>external</option>
                            </select> 
                            <button id="remove_reference" class="w3-button w3-transparent" aria-label="Delete this item">&times</button>
                            </div>
                          </div>
                        </li>
                    `
                }).join('')}
                <li>
                  <button id="add_reference" class="w3-button w3-block w3-green">Add Revsion</button>
                </li>
            </ul>
        `;
        }
        // Add a submit event listener to the form and prevent it from posting back
        self.element.querySelectorAll('#add_reference').forEach((button) => {
          button.addEventListener('click', () => {
            store.dispatch('addReference', null);
          });
        });
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('#remove_reference').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeReference', { index });
            });
        });
        
        self.element.querySelectorAll("input[type=\"text\"]").forEach((element) => {
            element.addEventListener('change', () => {
                store.dispatch('setItem', { path: element.id, value: element.value});
            });
        });
        
        self.element.querySelectorAll("select").forEach((element) => {
            element.addEventListener('change', () => {
                store.dispatch('setItem', { path: element.id, value: element.value});
            });
        });

    }
};
