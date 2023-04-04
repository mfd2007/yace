import store from './store/index.js'; 

// Load up components
import TextInput from './components/textinput.js';
import ComboInput from './components/comboinput.js';
import ProductList from './components/productList.js';
import VulnerabilityList from './components/vulnerabilityList.js';
import RevisionList from './components/revisionList.js';
import ReferenceList from './components/referencesList.js';
import NotesList from './components/notesList.js';

// Instantiate components
const fieldTitle = new TextInput("#title", "title", "document.title", true, "");
const fieldTrackingId = new TextInput("#tracking-id", "tracking", "document.tracking.id", true, "");

const comboTlp = new ComboInput(
  "#tlp", 
  "TLP-Label", 
  "document.distribution.tlp.label", 
  [
    {value:"WHITE", label:"WHITE"},
    {value:"GREEN", label:"GREEN"},
    {value:"AMBER", label:"AMBER"},
    {value:"RED", label:"RED"}],
  true);
    
const comboDocumentStatus = new ComboInput(
  "#document_status", 
  "Document status", 
  "document.tracking.status", 
  [
    {value:"draft", label:"draft"},
    {value:"interim", label:"interim"},
    {value:"final", label:"final"}],
  true);


const revisionList = new RevisionList("#revisionList");
const referenceList = new ReferenceList("#referencesList");
const notesList = new NotesList("#notesList");
const productList = new ProductList("#productList");
const vulnerabilityList = new VulnerabilityList("#vulnerablityList");
// Initial renders
fieldTitle.render();
fieldTrackingId.render();
comboTlp.render();
comboDocumentStatus.render();
revisionList.render();
referenceList.render();
notesList.render();
productList.render();
vulnerabilityList.render();

document.querySelectorAll("#btn_export").forEach((element) => {
            element.addEventListener('click', () => {
            
            store.mutations.setItem(store.state, {path:"document.tracking.initial_release_date", value: store.state.csaf.document.tracking.revision_history[0].date});  
            store.mutations.setItem(store.state, {path:"document.tracking.current_release_date", value: store.state.csaf.document.tracking.revision_history[store.state.csaf.document.tracking.revision_history.length-1].date});
            store.mutations.setItem(store.state, {path:"document.tracking.version", value: store.state.csaf.document.tracking.revision_history[store.state.csaf.document.tracking.revision_history.length-1].number});
            
            let obj = JSON.parse(JSON.stringify(store.state.csaf));
            let target={product_tree:{}};
            obj.product_tree.forEach((item) => {
              if(item.branches != undefined){
                if(target.product_tree.branches === undefined){
                  target.product_tree.branches = item.branches;
                }else{
                  item.branches.forEach((b) => {
                    target.product_tree.branches = [...target.product_tree.branches, b];
                  });
                }
              }else if(item.relationships != undefined){
                if(target.product_tree.relationships === undefined){
                  target.product_tree.relationships = [item.relationships];
                }else{
                  item.relationships.forEach((r) => {
                    target.product_tree.relationships = [...target.product_tree.relationships, r];
                  });
                }
              }
            });
            obj.product_tree = target.product_tree;

              const a = document.createElement("a");
              a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], {
                type: "text/plain"
              }));
              a.setAttribute("download", "data.txt");
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            });
        });

