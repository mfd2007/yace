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
              "number": "1",
              "date": "2023-06-05T00:00:00Z",
              "summary": "Initial version"
            }
          ]
        }
      },
      product_tree:[
        {
          "branches": [
            {
              "category": "vendor",
              "name": "Example Company",
              "branches": [
                {
                  "category": "product_name",
                  "name": "Product A",
                  "branches": [
                    {
                      "category": "product_version",
                      "name": "1.0",
                      "product": {
                        "name": "Product A 1.0",
                        "product_id": "1"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
};
