import * as JsonPath from '../lib/JsonPath.js';


  const API_URL_LIST = './data/product-list.json';
  const API_URL_PRODUCT = './data/products/';
  
  async function fetchProductList() {
    try{
     const response = await fetch(API_URL_LIST);
     const products = await response.json();
     return products;
    }catch(err){
      console.error(err); 
    }
  }

  async function getProductDetail(id){
    try{
     const response = await fetch(API_URL_PRODUCT + id +".json");
     const product = await response.json();
     return product;
    }catch(err){
      console.error(err);
      return {}; 
    }
  }

  function getProductFullNames(product_tree){
    let ret = JsonPath.jsonPath(product_tree, "product_tree.[:].product");
    if(ret){
      return ret;
    }else{
      ret = JsonPath.jsonPath(product_tree, "product_tree.full_product_names")[0];
      return ret;
    }
    //return [];
  }

  function getProductFullName(item){
      return item.branches[0].branches[0].product.name;
  }
  
  function getProductFullId(item){
      return item.branches[0].branches[0].product.product_id;
  }

  export {getProductDetail, getProductFullNames, getProductFullId, fetchProductList}
  
  