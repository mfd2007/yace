import Component from '../lib/component.js';
import store from '../store/index.js';

export default class TextInput extends Component {
    
    // Pass our store instance and the HTML element up to the parent Component
    constructor(selector, lbl, fld, required, pattern) {
        super({
            store,
            element: document.querySelector(selector)
        });
      this.label = lbl;
      this.field = fld;
      this.id=fld
      this.required = required;
      this.pattern = pattern;
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
        
        // Loop the items and generate a list of elements
        self.element.innerHTML = `
              <label for="${self.id}">${self.label}</label>
              <input type="text" 
                     class="w3-input w3-border" 
                     id="${self.id}" 
                     autocomplete="off" 
                     value="${self.getValue()}" 
                     data-csafpath="${this.field}" 
                     ${this.required?'required':''}  
                     ${this.pattern ? 'pattern=\"' + this.pattern + '\"':''} />
        `;
        
        document.querySelectorAll("[id=\""+self.id +"\"]").forEach((button, index) => {
            button.onchange = function(){
              store.dispatch('setItem', { path: button.dataset.csafpath, value: button.value});
            };
        });
    }
};
