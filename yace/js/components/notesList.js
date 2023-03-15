import Component from '../lib/component.js';
import store from '../store/index.js';
import * as proddb from '../lib/productdatabase.js';

export default class NotesList extends Component {
    
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
        if(store.state.csaf?.document?.notes == undefined) {
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>Notes</h2></li>
              <li>
                <button id="add_notes" class="w3-button w3-block w3-green">Add notes</button>
              </li>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
          self.element.innerHTML = `
            <ul class="w3-ul">
              <li><h2>Notes</h2></li>
                ${store.state.csaf?.document?.notes.map((notesItem, index) => {
                    return `
                        <li class="w3-container">
                          <div class="w3-row">
                            <label for="document.notes.${index}.title">title</label>
                            <input class="w3-input" id="document.notes.${index}.title" type="text" value="${(notesItem.title != undefined) ? notesItem.title:''}" />
                            <label for="document.notes.${index}.text">URL</label>
                            <input class="w3-input" id="document.notes.${index}.text" type="text" value="${(notesItem.text != undefined) ? notesItem.text:''}" />
                            <label for="document.notes.${index}.category">category</label>
                            <select id="document.notes.${index}.category" class="w3-select">
                              <option value="">Choose your option</option>
                              <option value="description" ${(notesItem?.category != undefined && notesItem?.category == "description")?'selected':''}>description</option>
                              <option value="details" ${(notesItem?.category != undefined && notesItem?.category == "details")?'selected':''}>details</option>
                              <option value="faq" ${(notesItem?.category != undefined && notesItem?.category == "faq")?'selected':''}>faq</option>
                              <option value="general" ${(notesItem?.category != undefined && notesItem?.category == "general")?'selected':''}>general</option>
                              <option value="legal_disclaimer" ${(notesItem?.category != undefined && notesItem?.category == "legal_disclaimer")?'selected':''}>legal_disclaimer</option>
                              <option value="other" ${(notesItem?.category != undefined && notesItem?.category == "other")?'selected':''}>other</option>
                              <option value="summary" ${(notesItem?.category != undefined && notesItem?.category == "summary")?'selected':''}>summary</option>
                            </select> 
                            <button id="remove_notes" class="w3-button w3-transparent" aria-label="Delete this item">&times</button>
                            </div>
                          </div>
                        </li>
                    `
                }).join('')}
                <li>
                  <button id="add_notes" class="w3-button w3-block w3-green">Add notes</button>
                </li>
            </ul>
        `;
        }
        // Add a submit event listener to the form and prevent it from posting back
        self.element.querySelectorAll('#add_notes').forEach((button) => {
          button.addEventListener('click', () => {
            store.dispatch('addNotes', null);
          });
        });
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('#remove_notes').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('removeNotes', { index });
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
