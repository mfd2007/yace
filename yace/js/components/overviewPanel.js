import Component from '../lib/component.js';
import store from '../store/index.js';

export default class ComboInput extends Component {
    
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
      // Loop the items and generate a list of elements
      self.element.innerHTML = `
        <div id="drop-area" class="w3-card w3-pale-blue">
          <p>Drag CSAF File</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div id="output">
        </div>
      `;
        
      document.querySelectorAll("[id=\"drop-area\"]").forEach((element, index) => {
        element.addEventListener('dragover', (event) => {
          event.stopPropagation();
          event.preventDefault();
          // Style the drag-and-drop as a "copy file" operation.
          event.dataTransfer.dropEffect = 'copy';
          }
        );
        element.addEventListener('drop', (event) => {
          event.stopPropagation();
          event.preventDefault();
          const fileList = event.dataTransfer.files;
          
          if(fileList.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', (event) => {
            var json = JSON.parse(event.target.result);
            store.dispatch('loadDocument',json);
          });
          reader.readAsText(fileList[0]);
        }
      });
    });
  }
};
