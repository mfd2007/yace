import Component from '../lib/component.js';
import store from '../store/index.js';
import TextInput from './textinput.js';
import ComboInput from './comboinput.js';

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
                            <div id="input_document.notes.${index}.title"></div>
                            <div id="input_document.notes.${index}.text"></div>
                            <div id="input_document.notes.${index}.category"></div>
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
          store.state.csaf?.document?.notes.forEach((notesItem, index) => {
            let noteTitle = new TextInput("#input_document\\.notes\\." + index + "\\.title", "Title", "document.notes." + index + ".title", true, "");
            noteTitle.render();
            let noteText = new TextInput("#input_document\\.notes\\." + index + "\\.text", "Text", "document.notes." + index + ".text", true, "");
            noteText.render();
            let noteCombo = new ComboInput(
              "#input_document\\.notes\\." + index + "\\.category", 
              "Category", 
              "document.notes." + index + ".category", 
              [
                {value:"description", label:"description"},
                {value:"details", label:"details"},
                {value:"faq", label:"faq"},
                {value:"general", label:"general"},
                {value:"legal_disclaimer", label:"legal_disclaimer"},
                {value:"other", label:"other"},
                {value:"summary", label:"summary"}],
              true);
            noteCombo.render();
          });
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
    }
};
