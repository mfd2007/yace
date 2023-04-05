
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

  function getProductFullName(item){
      return item.branches[0].branches[0].product.name;
  }
  
  function getProductFullId(item){
      return item.branches[0].branches[0].product.product_id;
  }

  export {getProductList,getProductDetail, getProductFullName, getProductFullId, fetchProductList}