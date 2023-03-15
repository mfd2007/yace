import Component from '../lib/component.js';
import store from '../store/index.js';

export default class TextInput extends Component {
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor(selector, lbl, fld, opts) {
        super({
            store,
            element: document.querySelector(selector)
        });
      this.label = lbl;
      this.field = fld;
      this.options = opts;
      this.id=fld;
    }

    getValue() {
      let self = this;
      let schema = store.state.csaf;  // a moving reference to internal objects within obj
      let pList = self.field.split('.');
      let len = pList.length;
      for(var i = 0; i < len-1; i++) {
          var elem = pList[i];
          
          if(isNaN(pList[i+1])){
            if( !schema[elem] ) {
              schema[elem] = {}
            }
            schema = schema[elem];
          }else{
            if( !schema[elem] ) {
              schema[elem] = [{}]
            }
            if( ! schema[elem].at(pList[i+1]) ){
              schema[elem].push({});
            }
            schema=schema[elem].at(pList[i+1]);
            i++;
          }
      }
      if (schema[pList[len-1]] != null){
        return schema[pList[len-1]];
      } else {
        return "";
      }
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        let selected = self.getValue();
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
            <label for="${self.id}">${self.label}</label>
            <select class="w3-input" id="${self.id}" value="${self.getValue()}">
              <option value="">Open this select menu</option>
              ${self.options.map(item => {
                    return `
                        <option value="${item.value}" ${(item.value == selected)?'selected':''}>${item.label}</option>
                    `
                }).join('')}
            </select>
        `;
        
        document.querySelectorAll("[id=\""+self.field +"\"]").forEach((button, index) => {
            button.addEventListener('change', () => {
                store.dispatch('setItem', { path: this.field, value: button.value});
            });
        });
    }
};
