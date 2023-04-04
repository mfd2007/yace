import Component from '../lib/component.js';
import store from '../store/index.js';

export default class DateInput extends Component {
    
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
      
      let date = "";
      if (schema[pList[len-1]] != null){
        date = new Date(schema[pList[len-1]]);
      } else {
        date = new Date();
      }

      var ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds());
      return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS;  
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
              <input class="w3-input w3-border" 
              id="${self.id}" 
              autocomplete="off" 
              type="datetime-local" 
              value="${self.getValue()}" 
              data-csafpath="${this.field}" 
              ${this.required?'required':''} />
        `;
        
        document.querySelectorAll("[id=\""+self.id +"\"]").forEach((button, index) => {
            button.onchange = function(){
              store.dispatch('setItem', { path: button.dataset.csafpath, value: button.value});
            };
        });
    }
};
