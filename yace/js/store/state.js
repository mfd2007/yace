export default {
    csaf: {
      document:{
        title:"CSAF test advisory",
        csaf_version:"2.0",
        category: "csaf_security_advisory",
        "publisher": {
          "category": "coordinator",
          "name": "ACME Cooperation",
          "namespace": "https://acme.example",
          "contact_details": "csaf@acme.example"
        },
        tracking:{
          "revision_history": [
            {
              "number": "1.0.0",
              "date": "2023-03-15T00:00:00Z",
              "summary": "Initial version"
            }
          ]
        }
      },
      product_tree:[
        {branches:[{category:"product_family", name:"controller", branches: [{category:"product_version", name:"1.0", product:{name:"controller 1.0",product_id:"1"}}]}]}
      ]
    }
};
