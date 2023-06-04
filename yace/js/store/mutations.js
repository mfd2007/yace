import * as proddb from '../lib/productdatabase.js';

export default {
    setItem(state, payload) {
      var schema = state.csaf;  // a moving reference to internal objects within obj
      var pList = payload.path.split('.');
      var len = pList.length;
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
      schema[pList[len-1]] = payload.value;
      return state;
  },
  addProduct(state, payload) {
    let prod = payload;
    if (!('product_tree' in state.csaf)) {state.csaf.product_tree = {}}
    if (!('branches' in state.csaf.product_tree)){
      state.csaf.product_tree.branches = [prod.branches];
    } else {
      state.csaf.product_tree.branches.push(prod.branches);
    }
    return state;
  },
  removeProduct(state, payload) {
    state.csaf.product_tree.branches.splice(payload.index, 1);
    return state;
  },
  
  addVulnerability(state, payload) {
    if (state.csaf.vulnerabilities == null){
      state.csaf.vulnerabilities =  [{}];
    } else {
      state.csaf.vulnerabilities.push({});
    }
    return state;
  },
  removeVulnerability(state, payload) {
    state.csaf.vulnerabilities.splice(payload.index, 1);
    return state;
  },
  addRevision(state, payload) {
    if (state.csaf.document.tracking.revision_history == null){
      state.csaf.document.tracking.revision_history =  [{}];
    } else {
      state.csaf.document.tracking.revision_history.push({});
    }
    return state;
  },
  removeRevision(state, payload) {
    state.csaf.document.tracking.revision_history.splice(payload.index, 1); 
    return state;
  },
  
  addReference(state, payload) {
    if (state.csaf.document.references == null){
      state.csaf.document.references =  [{}];
    } else {
      state.csaf.document.references.push({});
    }
    return state;
  },
  removeReference(state, payload) {
    state.csaf.document.references.splice(payload.index, 1);
    return state;
  },
  
  addNotes(state, payload) {
    if (state.csaf.document.notes == null){
      state.csaf.document.notes =  [{}];
    } else {
      state.csaf.document.notes.push({});
    }
    return state;
  },
  removeNotes(state, payload) {
    state.csaf.document.notes.splice(payload.index, 1);
    return state;
  },
  addVulNotes(state, payload) {
    if (state.csaf.vulnerabilities[payload.vulId].notes == null){
      state.csaf.vulnerabilities[payload.vulId].notes =  [{}];
    } else {
      state.csaf.vulnerabilities[payload.vulId].notes.push({});
    }
    return state;
  },
  removeVulNotes(state, payload) {
    state.csaf.vulnerabilities[payload.vulId].notes.splice(payload.index, 1);
    return state;
  },
  setProductStatus(state, payload){
    let vulStatus=state.csaf.vulnerabilities[payload.vulnerabilityId].product_status;
    if(vulStatus === undefined){
      state.csaf.vulnerabilities[payload.vulnerabilityId].product_status = {};
      vulStatus=state.csaf.vulnerabilities[payload.vulnerabilityId].product_status;
    }
    if(vulStatus[payload.status] === undefined){
      vulStatus[payload.status] = [];
    }
    Object.keys(vulStatus).forEach((status) =>{
      vulStatus[status].filter((productId => productId !== payload.productId));
    });
    vulStatus[payload.status].push(payload.productId);
    return state;
  },
  loadDocument(state, payload){
    state.csaf = payload;
    return state;
  }
};
