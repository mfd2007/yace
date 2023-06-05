export default {
    setItem(context, payload) {
      context.commit('setItem', payload);
    },

    addProduct(context, payload) {
      context.commit('addProduct', payload);
    },
    removeProduct(context, payload) {
      context.commit('removeProduct', payload);
    },

    addVulnerability(context, payload) {
      context.commit('addVulnerability', payload);
    },
    removeVulnerability(context, payload) {
      context.commit('removeVulnerability', payload);
    },
    updateVulnerability(context, payload) {
      context.commit('updateVulnerability', payload);
    },
    
    addRevision(context, payload) {
      context.commit('addRevision', payload);
    },
    removeRevision(context, payload) {
      context.commit('removeRevision', payload);
    },
    
    addReference(context, payload) {
      context.commit('addReference', payload);
    },
    removeReference(context, payload) {
      context.commit('removeReference', payload);
    },
    
    addNotes(context, payload) {
      context.commit('addNotes', payload);
    },
    removeNotes(context, payload) {
      context.commit('removeNotes', payload);
    },
    addVulNotes(context, payload) {
      context.commit('addVulNotes', payload);
    },
    removeVulNotes(context, payload) {
      context.commit('removeVulNotes', payload);
    },
    addVulRemediations(context, payload) {
      context.commit('addVulRemediations', payload);
    },
    removeVulRemediations(context, payload) {
      context.commit('removeVulRemediations', payload);
    },
    setRemediationProduct(context, payload) {
      context.commit('setRemediationProduct', payload);
    },
    setProductStatus(context, payload) {
      context.commit('setProductStatus', payload);
    },
    loadDocument(context, payload){
      context.commit('loadDocument', payload);
    }
};
