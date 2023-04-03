import Component from '../lib/component.js';
import store from '../store/index.js';
import TextInput from './textinput.js';
import ComboInput from './comboinput.js';

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
            <h2>References</h2>
            <button id="add_reference" class="w3-button w3-block w3-green">Add reference</button>
         `;
        } else {
        // Loop the items and generate a list of elements
          self.element.innerHTML = `
            <h2>Revision</h2>
            ${store.state.csaf?.document?.references.map((item, index) => {
              return `
                <div class="w3-panel w3-leftbar">
                  <div class="w3-row">
                    <div class="w3-col w3-right" style="width:50px">
                      <button id="remove_reference" class="w3-button w3-pale-red" aria-label="Delete this item">&times</button>
                    </div>
                    <div class="w3-rest w3-container">
                      <div id="input_document.references.${index}.summary"></div>
                      <div id="input_document.references.${index}.url"></div>
                      <div id="input_document.references.${index}.category"></div>
                    </div>
                  </div>
                </div>
              `
            }).join('')}
            <button id="add_reference" class="w3-button w3-block w3-green">Add Revsion</button>
          `;
          store.state.csaf?.document?.references.forEach((item, index) => {
            let refSummary = new TextInput("#input_document\\.references\\." + index + "\\.summary", "Summary", "document.references." + index + ".summary", true, "");
            refSummary.render();
            let refUrl = new TextInput("#input_document\\.references\\." + index + "\\.url", "URL", "document.references." + index + ".url", true, "");
            refUrl.render();
            let noteCombo = new ComboInput(
              "#input_document\\.references\\." + index + "\\.category", 
              "Category", 
              "document.references." + index + ".category", 
              [
                {value:"self", label:"self"},
                {value:"external", label:"external"}],
              true);
            noteCombo.render();
          });
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
    }
};
