import store from './store/index.js'; 

// Load up components
import TextInput from './components/textinput.js';
import ComboInput from './components/comboinput.js';
import ProductList from './components/productList.js';
import VulnerabilityList from './components/vulnerabilityList.js';
import RevisionList from './components/revisionList.js';
import ReferenceList from './components/referencesList.js';
import NotesList from './components/notesList.js';

import OverviewPanel from './components/overviewPanel.js';
import createFilename from './lib/createFilename.js';

// Instantiate components
const fieldTitle = new TextInput("#title", "title", "document.title", true, "");
const fieldTrackingId = new TextInput("#tracking-id", "tracking", "document.tracking.id", true, "");

const comboTlp = new ComboInput(
  "#tlp", 
  "TLP-Label", 
  "document.distribution.tlp.label", 
  [
    {value:"WHITE", label:"TLP:CLEAR"},
    {value:"GREEN", label:"TLP:GREEN"},
    {value:"AMBER", label:"TLP:AMBER"},
    {value:"RED", label:"TLP:RED"}],
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
const vulnerabilityList = new VulnerabilityList("#vulnerabilityList");

const overviewPanel = new OverviewPanel("#loadPanel");
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

overviewPanel.render();

document.querySelectorAll("#btn_export").forEach((element) => {
            element.addEventListener('click', () => {
            
            store.mutations.setItem(store.state, {path:"document.tracking.initial_release_date", value: store.state.csaf.document.tracking.revision_history[0].date});  
            store.mutations.setItem(store.state, {path:"document.tracking.current_release_date", value: store.state.csaf.document.tracking.revision_history[store.state.csaf.document.tracking.revision_history.length-1].date});
            store.mutations.setItem(store.state, {path:"document.tracking.version", value: store.state.csaf.document.tracking.revision_history[store.state.csaf.document.tracking.revision_history.length-1].number});
            
            let obj = JSON.parse(JSON.stringify(store.state.csaf));
            let target={product_tree:{}};
            obj.product_tree.branches.forEach((item) => {
              if(item != undefined){
                if(target.product_tree.branches === undefined){
                  target.product_tree.branches = [item];
                }else{
                  target.product_tree.branches = [...target.product_tree.branches, item]
                }
              }else if(item.relationships != undefined){
                if(target.product_tree.relationships === undefined){
                  target.product_tree.relationships = [item];
                }else{
                  target.product_tree.relationships = [...target.product_tree.relationships, item];
                }
              }
            });
            obj.product_tree = target.product_tree;

              const a = document.createElement("a");
              a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], {
                type: "application/json"
              }));
              a.setAttribute("download", createFilename(obj, true, "json"));
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            });
        });

