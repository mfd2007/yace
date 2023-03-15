export default {
    csaf: {
      document:{
        title:"Test title",
        csaf_version:"2.0",
        category: "csaf_security_advisory",
        "publisher": {
          "category": "coordinator",
          "name": "bsi",
          "namespace": "hh:jjj",
          "contact_details": "dd@ddd"
        },
        tracking:{
          "revision_history": [
            {
              "number": "1.0.0",
              "date": "2023-03-15T01:01",
              "summary": "12122"
            }
          ]
        }
      },
      product_tree:[
        {branches:[{category:"product_family", name:"controller", branches: [{category:"product_version", name:"1.0", full_product_names:{name:"controller 1.0",product_id:"1"}}]}]}
      ]
    }
};
