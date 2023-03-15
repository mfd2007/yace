import Component from '../lib/component.js';
import store from '../store/index.js';
import * as proddb from '../lib/productdatabase.js';

export default class RevisionList extends Component {
    
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
        if(store.state.csaf?.document?.tracking?.revision_history == undefined) {
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>Revision</h2></li>
              <li>
                <button id="add_revision" class="w3-button w3-block w3-green">Add</button>
              </li>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>Revision</h2></li>
                ${store.state.csaf.document.tracking.revision_history.map((revisionItem, index) => {
                    return `
                        <li class="w3-display-container">
                          <div>
                            <label for="document.tracking.revision_history.${index}.number">Version</label>
                            <input id="document.tracking.revision_history.${index}.number" type="text" value="${(revisionItem.number != undefined) ? revisionItem.number:''}" />
                            <label for="document.tracking.revision_history.${index}.date">Date</label>
                            <input id="document.tracking.revision_history.${index}.date" type="datetime-local" value="${(revisionItem.date != undefined) ? revisionItem.date:''}" />
                            <label for="document.tracking.revision_history.${index}.summary">summary</label>
                            <input id="document.tracking.revision_history.${index}.summary" type="text" value="${(revisionItem.summary != undefined) ? revisionItem.summary:''}" />
                            <button id="remove_revision" class="w3-button w3-transparent w3-display-right" aria-label="Delete this item">&times</button>
                          </div>
                        </li>
                    `
                }).join('')}
                <li>
                  <button id="add_revision" class="w3-button w3-block w3-green">Add Revsion</button>
                </li>
            </ul>
        `;
        }
        // Add a submit event listener to the form and prevent it from posting back
        self.element.querySelectorAll('#add_revision').forEach((button) => {
          button.addEventListener('click', () => {
            store.dispatch('addRevision', null);
          });
        });
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('#remove_revision').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeRevision', { index });
            });
        });
        
        self.element.querySelectorAll("input[type=\"text\"]").forEach((element) => {
            element.addEventListener('change', () => {
                store.dispatch('setItem', { path: element.id, value: element.value});
            });
        });
        
        self.element.querySelectorAll("input[type=\"datetime-local\"]").forEach((element) => {
            element.addEventListener('change', () => {
                store.dispatch('setItem', { path: element.id, value: element.value});
            });
        });

    }
};
