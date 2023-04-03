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
                          <div id="input_document.tracking.revision_history.${index}.number"></div>
                          <div id="input_document.tracking.revision_history.${index}.summary"></div>
                          <div id="input_document.tracking.revision_history.${index}.date"></div> 
                          <button id="remove_revision" class="w3-button w3-transparent w3-display-right" aria-label="Delete this item">&times</button>
                        </li>
                    `
                }).join('')}
                <li>
                  <button id="add_revision" class="w3-button w3-block w3-green">Add Revsion</button>
                </li>
            </ul>
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
    }
};
