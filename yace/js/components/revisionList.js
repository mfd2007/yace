import Component from '../lib/component.js';
import store from '../store/index.js';
import TextInput from './textinput.js';
import DateInput from './dateinput.js';

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
            <h3>Revision</h3>
            <ul class="w3-ul">
              <li>
                <button id="add_revision" class="w3-button w3-block w3-green">Add</button>
              </li>
            </ul>
         `;
        } else {
        // Loop the items and generate a list of elements
          self.element.innerHTML = `
            <h3>Revision</h3>
            ${store.state.csaf.document.tracking.revision_history.map((revisionItem, index) => {
              return `
                <div class="w3-panel w3-leftbar">
                  <div class="w3-row">
                    <div class="w3-col w3-right" style="width:50px">
                      <button id="remove_revision" class="w3-button w3-pale-red" aria-label="Delete this item">&times</button>
                    </div>
                    <div class="w3-rest w3-container">
                      <div id="input_document.tracking.revision_history.${index}.number"></div>
                      <div id="input_document.tracking.revision_history.${index}.summary"></div>
                      <div id="input_document.tracking.revision_history.${index}.date"></div>
                    </div>
                  </div>
                </div>
              `
              }).join('')}
            <button id="add_revision" class="w3-button w3-block w3-green">Add Revsion</button>
          `;
          store.state.csaf.document.tracking.revision_history.forEach((item, index) => {
            let version = new TextInput("#input_document\\.tracking\\.revision_history\\." + index + "\\.number", "Version", "document.tracking.revision_history." + index + ".number", true, "");
            version.render();
            let summary = new TextInput("#input_document\\.tracking\\.revision_history\\." + index + "\\.summary", "Version", "document.tracking.revision_history." + index + ".summary", true, "");
            summary.render();
            let datefield =  new DateInput("#input_document\\.tracking\\.revision_history\\." + index + "\\.date", "Date", "document.tracking.revision_history." + index + ".date", true);
            datefield.render();
          });
        }
        // Add a submit event listener to the form and prevent it from posting back
        self.element.querySelectorAll('#add_revision').forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            store.dispatch('addRevision', null);
          });
        });
        
        // Find all the buttons in the list and when they are clicked, we dispatch a 
        // `clearItem` action which we pass the current item's index to
        self.element.querySelectorAll('#remove_revision').forEach((button, index) => {
            button.addEventListener('click', (event) => {
              event.preventDefault()
              store.dispatch('removeRevision', { index });
            });
        });
    }
};
