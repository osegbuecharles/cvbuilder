//API PATH
//const  apiurl  = "../API/";
const  apiurl  = "http://127.0.0.1/ivs/API/";
//const  apiurl  = "https://zane.osegbuecharles.com/API/";

//APIS

//API call for login 
function loginApi(email,password){
    var settings = {
        "url": apiurl+"login/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "password": password
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}


//API call for changing password
function changePasswordApi(userId,oldpassword,newpassword){
  var settings = {
      "url": apiurl+"changePassword/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,
        "oldpassword": oldpassword,
        "newpassword":newpassword
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting user details
function getUserDetailsApi(userId,password){
  var settings = {
      "url": apiurl+"getUserDetails/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,
        "password": password
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for register into admin portal
function registerApi(email,password,lastName,firstName,gender){
    var settings = {
        "url": apiurl+"register/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "password": password,
          "lastName": lastName,
          "firstName": firstName,
          "gender": gender
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call to update user
function updateUserApi(userId,password,lastName,firstName){
  var settings = {
      "url": apiurl+"updateUser/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "lastName":lastName,
        "firstName":firstName,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to  verify email
function verifyApi(email,token){
    var settings = {
        "url": apiurl+"verify/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "token": token,
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call to activate subscription
function activateApi(email,token){
    var settings = {
        "url": apiurl+"activateAccount/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "token": token,
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call for to resend Confirmation email
function resendVerificationApi(email,password){
    var settings = {
        "url": apiurl+"resendVerification/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "password": password
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call to create activation token
function createActivationTokenApi(email,password){
    var settings = {
        "url": apiurl+"createActivationToken/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "password": password,
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call to deactivate account
function deactivateAccountApi(adminemail,adminpassword,email){
    var settings = {
        "url": apiurl+"deactivateAccount/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "adminEmail":adminemail,
          "adminPassword": adminpassword,
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}

//API call to create New Inventory
function newInventoryApi(userId,password,name,purpose,type){
  var settings = {
      "url": apiurl+"newInventory/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "name":name,
        "purpose":purpose,
        "type":type
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to create New Inventory with accent color
function newInventoryApi(userId,password,name,purpose,type,accent){
  var settings = {
      "url": apiurl+"newInventory/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "name":name,
        "purpose":purpose,
        "type":type,
        "accent":accent
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to update Inventory
function updateInventoryApi(inventoryId,userId,password,name,purpose){
  var settings = {
      "url": apiurl+"updateInventory/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "inventoryName":name,
        "inventoryPurpose":purpose,
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to update Inventory and accent color
function updateInventoryApi(inventoryId,userId,password,name,purpose,accent){
  var settings = {
      "url": apiurl+"updateInventory/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "inventoryName":name,
        "inventoryPurpose":purpose,
        "accent":accent
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call to delete Inventory
function deleteInventoryApi(inventoryId,userId,password){
  var settings = {
      "url": apiurl+"deleteInventory/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,        
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Inventories
function getInventoriesApi(userId,password,pageNum,pageSize){
  var settings = {
      "url": apiurl+"getInventories/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"all",
        "pageNum":pageNum,
        "pageSize":pageSize
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to search for Inventories
function searchInventoriesApi(userId,password,criteria,value){
  var settings = {
      "url": apiurl+"getInventories/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":criteria,        
        "value":value
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call to create New Inventory Item
function createInventoryItemApi(inventoryId,userId,password,name,purpose,category,quantity,unit){
  var settings = {
      "url": apiurl+"newItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemName":name,
        "itemPurpose":purpose,
        "itemCategory":category,
        "itemQuantity":quantity,
        "itemUnit":unit
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to create New Inventory Item Without unit
function createInventoryItemApi(inventoryId,userId,password,name,purpose,category,quantity){
  var settings = {
      "url": apiurl+"newItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemName":name,
        "itemPurpose":purpose,
        "itemCategory":category,
        "itemQuantity":quantity,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to create Increase Inventory Item By 1
function increaseInventoryItemApi(inventoryId,userId,password,itemId){
  var settings = {
      "url": apiurl+"increaseItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemId": itemId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to create decrease Inventory Item By 1
function decreaseInventoryItemApi(inventoryId,userId,password,itemId){
  var settings = {
      "url": apiurl+"decreaseItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemId": itemId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to create update Inventory Item
function updateInventoryItemApi(inventoryId,userId,password,itemId,itemCategory,itemUnit,itemPurpose,itemQuantity){
  var settings = {
      "url": apiurl+"updateItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemId": itemId,
        "itemCategory":itemCategory,
        "itemUnit":itemUnit,
        "itemPurpose":itemPurpose,
        "itemQuantity":itemQuantity
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call to create delete Inventory Item
function deleteInventoryItemApi(inventoryId,userId,password,itemId){
  var settings = {
      "url": apiurl+"deleteItem/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "inventoryId":inventoryId,
        "userId": userId,        
        "password": password,
        "itemId": itemId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Inventory items
function getItemsApi(userId,password,pageNum,pageSize,inventoryId){
  var settings = {
      "url": apiurl+"getItems/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"all",
        "pageNum":pageNum,
        "pageSize":pageSize,
        "inventoryId":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to search for Inventory items
function searchItemsApi(userId,password,criteria,value,inventoryId){
  var settings = {
      "url": apiurl+"getItems/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":criteria,        
        "value":value,
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call to get Inventory timeline
function getInventoryTimelineApi(userId,password,inventoryId){
  var settings = {
      "url": apiurl+"getInventoryTimeline/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"all",                
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Item timeline
function getItemTimelineApi(userId,password,inventoryId,value){
  var settings = {
      "url": apiurl+"getInventoryTimeline/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"id",                
        "value":value,
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Year timeline
function getYearTimelineApi(userId,password,inventoryId,value){
  var settings = {
      "url": apiurl+"getInventoryTimeline/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"year",                
        "value":value,
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Month timeline
function getMonthTimelineApi(userId,password,inventoryId,value){
  var settings = {
      "url": apiurl+"getInventoryTimeline/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"month",                
        "value":value,
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call to get Date timeline
function getDateTimelineApi(userId,password,inventoryId,day,month,year){
  var settings = {
      "url": apiurl+"getInventoryTimeline/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "userId": userId,        
        "password": password,
        "criteria":"year",                
        "year":year,
        "month":month,
        "day":day,
        "inventory":inventoryId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


