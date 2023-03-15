/**
 * 
 */
  function getProductList(){
    return [{id:1,label:"Controller v1.0"},{id:2,label:"Controller v2.0"},{id:3,label:"Controller v3.0"} ]
  }
  
  function getProductDetail(id){
    switch(id){
      case "1":
        return {branches:[{category:"product_family", name:"controller", branches: [{category:"product_version", name:"1.0", product:{name:"controller 1.0",product_id:"1"}}]}]};
      case "2":
        return {branches:[{category:"product_family", name:"controller", branches: [{category:"product_version", name:"2.0", product:{name:"controller 2.0",product_id:"2"}}]}]};
      case "3":
        return {branches:[{category:"product_family", name:"controller", branches: [{category:"product_version", name:"3.0", product:{name:"controller 3.0",product_id:"3"}}]}]};
    }
    return [];
  }

  function getProductFullName(item){
      return item.branches[0].branches[0].product.name;
  }
  
  function getProductFullId(item){
      return item.branches[0].branches[0].product.product_id;
  }

  export {getProductList,getProductDetail, getProductFullName, getProductFullId}