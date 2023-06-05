import Component from '../lib/component.js';
import store from '../store/index.js';

export default class TextInputVector extends Component {
    
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
              return "";
            }
            schema = schema[elem];
          }else{
            if( !schema[elem] ) {
              return "";
            }
            if( ! schema[elem].at(pList[i+1]) ){
              return "";
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
                     class="w3-input w3-border yace-score-values" 
                     id="${self.id}" 
                     autocomplete="off" 
                     value="${self.getValue()}" 
                     data-csafpath="${this.field}" 
                     ${this.required?'required':''}  
                     ${this.pattern ? 'pattern=\"' + this.pattern + '\"':''} />
        `;

        self.element.querySelectorAll("[id=\""+self.id +"\"]").forEach((element) => {
            element.addEventListener('change', () => {
                store.dispatch('setScoreValues', { path: element.id, value: element.value});
            });
        });
    }

};
