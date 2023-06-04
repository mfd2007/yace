export default {
    csaf: {
      document:{
        title:"CSAF test advisory",
        csaf_version:"2.0",
        category: "csaf_security_advisory",
        "publisher": {
          "category": "vendor",
          "name": "Example Company",
          "namespace": "https://www.example.com",
          "contact_details": "psirt@example.com"
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
        {}
      ]
    }
};
