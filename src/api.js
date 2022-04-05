import $ from 'jquery';


//API PATH
//const  apiurl  = "../API/";
//export const  apiurl  = "http://127.0.0.1/cvbuilder/API/";
export const  apiurl  = "https://osegbuecharles.com/API_CVBUILDER/API/";

//APIS

//API call for getting meta
export function getMeta(url){
  var settings = {
      "url": "https://osegbuecharles.com/getMeta/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "url": url,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for login 
export function loginApi(email,password){
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
 
//API call for register into admin portal
export function registerApi(email,password,lastName,firstName,middleName,phone,location,bio){
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
        "lastName":lastName,
        "firstName":firstName,
        "middleName":middleName,
        "phone":phone,
        "location":location,
        "bio":bio
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
export function changePasswordApi(email,oldpassword,newpassword){
  var settings = {
      "url": apiurl+"changePassword/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
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
export function getUserApi(code){
  var settings = {
      "url": apiurl+"getUser/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "code":code        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting userSettings
export function getUserSettingsApi(email){
  var settings = {
      "url": apiurl+"getUserSettings/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding skills
export function addSkillApi(email,password,skill,skillLevel){
  var settings = {
      "url": apiurl+"addSkill/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "skill":skill,
        "skillLevel":skillLevel
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting skills
export function getSkillApi(email){
  var settings = {
      "url": apiurl+"getSkill/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for removing skills 
export function removeSkillApi(email,password,skill){
  var settings = {
      "url": apiurl+"removeSkill/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "skill":skill
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding referee
export function addRefereeApi(email,password,remail,name,phone,description){
  var settings = {
      "url": apiurl+"addReferee/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "remail":remail,
        "phone":phone,
        "name":name,
        "description":description
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating referee
export function updateRefereeApi(email,password,remail,name,phone,description,id){
  var settings = {
      "url": apiurl+"updateReferee/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "remail":remail,
        "phone":phone,
        "name":name,
        "description":description,
        "id":id
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting referee 
export function getRefereeApi(email){
  var settings = {
      "url": apiurl+"getReferee/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding project 
export function addProjectApi(email,password,name,link,description){
  var settings = {
      "url": apiurl+"addProject/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "name":name,
        "link":link,
        "description":description
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating project 
export function updateProjectApi(email,password,name,link,description,id){
  var settings = {
      "url": apiurl+"updateProject/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "name":name,
        "link":link,
        "description":description,
        "id":id
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting project
export function getProjectApi(email){
  var settings = {
      "url": apiurl+"getProject/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding Experience
export function addExperienceApi(email,password,role,start,end,company,others){
  var settings = {
      "url": apiurl+"addExperience/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "role":role,
        "start":start,
        "end":end,
        "company":company,
        "others":others
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating Experience
export function updateExperienceApi(email,password,role,start,end,company,others,id){
  var settings = {
      "url": apiurl+"updateExperience/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "role":role,
        "start":start,
        "end":end,
        "company":company,
        "others":others,
        "id":id
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting experience
export function getExperienceApi(email){
  var settings = {
      "url": apiurl+"getExperience/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding Education
export function addEducationApi(email,password,certificate,start,end,school,others){
  var settings = {
      "url": apiurl+"addEducation/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "certificate":certificate,
        "start":start,
        "end":end,
        "school":school,
        "others":others
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating Education
export function updateEducationApi(email,password,certificate,start,end,school,others,id){
  var settings = {
      "url": apiurl+"updateEducation/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "certificate":certificate,
        "start":start,
        "end":end,
        "school":school,
        "others":others,
        "id":id
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting education
export function getEducationApi(email){
  var settings = {
      "url": apiurl+"getEducation/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for adding certification
export function addCertificationApi(email,password,name,link,organization){
  var settings = {
      "url": apiurl+"addCertification/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "name":name,
        "link":link,
        "organization":organization
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating certification
export function updateCertificationApi(email,password,name,link,organization,id){
  var settings = {
      "url": apiurl+"updateCertification/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password": password,
        "name":name,
        "link":link,
        "organization":organization,
        "id":id
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call for getting certification
export function getCertificationApi(email){
  var settings = {
      "url": apiurl+"getCertification/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for removing info(referee,project,experience or certification)
export function removeInfoApi(email,password,info,id){
  var settings = {
      "url": apiurl+"removeInfo/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,
        "password":password,
        "info":info,
        "id":id        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating custom link
export function updateLinkApi(email,password,link){
  var settings = {
      "url": apiurl+"updateLink/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,  
        "password":password,
        "link":link      
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating template
export function updateTemplateApi(email,password,template){
  var settings = {
      "url": apiurl+"updateTemplate/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,  
        "password":password,
        "template":template      
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating profile
export function updateProfileApi(email,password,lastName,firstName,middleName,phone,location,bio){
  var settings = {
      "url": apiurl+"updateProfile/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": { 
        "email": email,        
        "password":password,
        "lastName":lastName,
        "firstName":firstName,
        "middleName":middleName,
        "phone":phone,
        "location":location,
        "bio":bio
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating color scheme
export function updateColorSchemeApi(email,password,color){
  var settings = {
      "url": apiurl+"updateColorScheme/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": { 
        "email": email,        
        "password":password,
        "colorScheme":color,        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for updating user Settings
export function updateUserSettingsApi(email,password,name,val){
  var settings = {
      "url": apiurl+"updateUserSettings/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email": email,  
        "password":password,
        "name":name,
        "val":val
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}


//API call for getting site settings
export function getSiteSettingsApi(name){
  var settings = {
      "url": apiurl+"getSettings/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "name": name,          
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting templates
export function getTemplatesApi(code){
  var settings = {
      "url": apiurl+"getTemplates/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "code": code,          
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

//API call for getting templates
export function getAllTemplatesApi(){
  var settings = {
      "url": apiurl+"getTemplates/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
}

