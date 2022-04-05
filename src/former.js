  {/*pop up Modal*/}
  <button data-toggle="modal" id="modalBtn" style={{display:"none"}} data-target="#adminModal"></button>
    {/*The Modal*/}
    <div className="modal fade" id="adminModal">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable ">
          <div className="modal-content " style={{backgroundColor:"white"}}>
                {/* Modal Header */}
            <div className="modal-header">
               
           </div>
      
            {/* Modal body */}
            <div className="modal-body">
               
            </div>
      
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-warning text-light" data-dismiss="modal">Close</button>
            </div>
      
          </div>
        </div>
    </div>

   <div className="container-fluid login px-4" style={{display:"none"}}>

       {/* THE LOGIN HTML   */}
       <div id="login-box" className="container-fluid pt-2 mt-4"  data-aos="zoom-in">
           <div className="container-fluid my-5 logo" >
               IVS
           </div>
           <h3>LOGIN</h3>
           <div className="container">
               <form autoComplete="on" method="POST" id="loginForm">
                   <div className="form-group">
                       <input type="text" className="form-control" id="loginEmail" placeholder="Email" required/>
                   </div>
                   <div className="form-group">                        
                       <input type="password" className="form-control" id="loginPassword" placeholder="Password" required/>
                   </div>
                   <div className="container-fluid" style={{textAlign:"center"}}>
                       <button type="submit" className="bn p-2" style={{color:"white"}}>
                           <span></span>
                           <span></span>
                           <span></span>
                           <span></span>
                           LOGIN
                       </button>    
                     </div>                      
               </form>
               <br/>
               <p>Don't have an account? <button className="btn btn-primary" id="createAccount">Register</button></p>
           </div>
       </div>

       {/* THE SIGNUP HTML   */}
       <div  id="signup-box" className="container-fluid mt-1" style={{display:"none"}}>
           <div className="container-fluid my-3 logo" >
               IVS
           </div>
           <h3>Register</h3>
           <div className="container">
               <form autoComplete="on" method="POST" id="signupForm">
                   <div className="form-group">
                       <input type="text" className="form-control" id="signupEmail" placeholder="Email" required/>
                   </div>
                   <div className="form-group">                        
                       <input type="password" className="form-control" id="signupPassword" placeholder="Password" required/>
                   </div>
                   <div className="form-group">                        
                       <input type="password" className="form-control" id="signupConfirmPassword" placeholder="Confirm Password" required/>
                       <span style={{color:"red",display:"none"}} id="passwordMismatch">Does not match!</span>
                   </div>                    
                   <div className="form-group">
                       <input type="text" className="form-control" id="signupLastName" placeholder="Last Name" required/>
                   </div>
                   <div className="form-group">
                       <input type="text" className="form-control" id="signupFirstName" placeholder="First Name" required/>
                   </div>
                   <div className="form-group">
                       <label><b>Gender</b></label><br/>
                       <input type="radio" name="gender" id="signupGender" value="male" required/>&nbsp;Male&nbsp;&nbsp;
                       <input type="radio" name="gender" id="signupGender" value="female" required/>&nbsp;Female
                   </div>
                 <div className="container-fluid" style={{textAlign:"center"}}>
                   <button type="submit" className="bn p-2" style={{color:"white"}}>
                       <span></span>
                       <span></span>
                       <span></span>
                       <span></span>
                       REGISTER
                   </button>    
                 </div>          
               </form>
               <br/>
               <p>Already have an account? <button className="btn btn-primary" id="haveAccount">Login</button></p>
           </div>          
       </div>

       <div className="circle1"></div>
       <div className="circle2"></div>
       <div className="circle3"></div>
       <div className="circle4"></div>
       <div className="circle5"></div>
       <div className="circle6"></div>

   </div>

   <div className="container-fluid main p-0"style={{display:"none"}}>

           {/*Desktop View of inventory*/}
           <div className="container-fluid row p-0 desktopView">

               {/*SIDE BAR*/}
               <div className="container-fluid col-lg-1 menu pt-4" data-aos="fade-right">
                   <ul className="nav nav-pills px-0 sidebar">
                       <li className="nav-item sidebar-item">
                           <a className="nav-link active" data-toggle="pill" href="#dashboard" data-toggle="tooltip" data-placement="top" title="Dashboard"><i className="fa fa-home"></i></a>
                       </li>  

                       <li className="nav-item sidebar-item">
                           <a className="nav-link" data-toggle="pill" href="#inventory" data-toggle="tooltip" data-placement="top" title="Inventory"><i className="bx bx-notepad"></i></a>                                    
                       </li>  

                       <button className="btn btn-danger  logoutBtn" style={{marginLeft:"-20%"}}><i className="bx bx-log-out"></i></button>
                   </ul>
               </div>

               {/*CONTENT*/}
               <div className="container-fluid col-lg-11 content tab-content" data-aos="zoom-in">


                   {/*DASHBOARD SECTION*/}
                   <div className="container-fluid tab-pane  pt-4" id="dashboard">
                       <h3>Welcome Back! <span className="name"></span></h3>
                       <div className="container-fluid row mt-4">
                           <div className="card col-lg-4  sector px-0">
                               <div className="card-header"><b>Profile</b> <i className="editProfile fa fa-pencil" ></i></div>
                               <div className="card-body">
                                   <span className="email"></span><br/>
                                   <span className="name"></span><br/>                                    
                               </div>
                           </div>

                           <div className="card col-lg-4 sector px-0">
                               <div className="card-header"><b>Subscription</b></div>
                               <div className="card-body">
                                   <span className="subscriptionStatus"></span><br/>
                                   <span className="subscriptionType"></span><br/>
                                   Ends <span className="subscriptionEnd"></span>
                               </div>
                           </div>
                       </div>

                   </div>

                   {/*Inventory SECTION*/}
                   <div className="container-fluid tab-pane active" id="inventory">
                       
                       {/*INVENTORY VIEW*/}
                       <div className="container-fluid inventoryView px-0 pt-4" id="inventoryView">

                           <form method="post" id="inventorySearchForm" className="inventorySearchForm" >
                               <div className="container-fluid row">
                                   <div className="form-group col-lg-9 mr-0 pr-0">
                                       <input id="inventorySearchBar" className="inventorySearchBar  form-control searchBar" type="search" placeholder="Search for inventories" required/>
                                   </div>
                                   <button className="btn btn-warning text-light ml-0 searchBtn" type="submit">Submit</button>
                               </div>
                           </form>

                           <button id="inventorySearchBack" className="btn btn-danger inventorySearchBack" style={{display:"none"}}>Back</button><br/>
                           <h3 className=".searchName" style={{display:"none"}}>Name</h3>
                           <button className="btn btn-warning text-light newButton" onClick="newInventory()">New +</button>

                           <div className="container-fluid view row mt-4 px-0 inventories" id="inventories">
{/*
                               <div className="card ml-3 mt-3 px-0" style="background-color: green;color:white;">
                                   <div className="card-header" style="text-transform:capitalize;">
                                       Booking Inventory
                                   </div>
                                   <div className="card-body">
                                       2 items<br/>
                                       For monitoring business<br/>                                        
                                   </div>
                                   <div className="card-footer">
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="View Inventory" onClick="viewInventory('id')"><i className="fa fa-eye"></i></button>
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="Edit Inventory" onClick="editInventory('id')"><i className="fa fa-pencil"></i></button>
                                       <button className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Inventory" onClick="deleteInventory('id')"><i className="fa fa-trash"></i></button>
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="View Inventory Timeline" onClick="viewInventoryTimeline('id')"><i className="bx bx-time"></i></button>
                                   </div>
                               </div>

                           */}


                               

                           </div>
                           <div className="container-fluid inventoryView mt-4 paginationInventory" id="paginationInventory">
                                   
                           </div>
                       </div>
                       

                       {/*INVENTORY TIMELINE VIEW*/}
                       <div className="container-fluid timelineView extra px-0 pt-4 inventoryTimelineView" id="inventoryTimelineView" style={{display:"none"}}>                                                    

                           <button className="btn btn-danger leaveExtra">Back</button>

                           <div className="container-fluid view row mt-4 px-0" id="timeline">
                               Timeline

                           <div className="container-fluid timelineView" id="paginationTimeline" style={{display:"none"}}>

                           </div>
                       </div>
                   
                       </div>

                       {/*ITEMS VIEW*/}
                       <div className="container-fluid itemView extra px-0 pt-4" id="itemView"style={{display:"none"}}>

                           <button className="btn btn-danger leaveExtra">Back</button>
                           <form method="post" id="itemSearchForm" className="mt-2">
                               <div className="container-fluid row">
                                   <div className="form-group col-lg-9 mr-0 pr-0">
                                       <input id="itemSearchBar" className="form-control searchBar" type="search" placeholder="Search for items" required/>
                                   </div>
                                   <button className="btn btn-warning text-light ml-0 searchBtn" type="submit">Submit</button>
                               </div>
                           </form>

                           <button className="btn btn-warning text-light" onClick="newItem()">New +</button>

                           <div className="container-fluid view row mt-4 px-0" id="items">
                                   ITEM

                               <div className="container-fluid itemView" id="paginationItem" style={{display:"none"}}>

                               </div>
                           </div>
                   
                       </div>
                   </div>


               </div>
           </div>

           
           {/*Mobile View of inventory*/}
           <div className="container-fluid mobileView p-0">
              
                 {/*BOTTOM BAR*/}
                 <div className="container-fluid mobile-menu py-0">                    
                   <ul className="nav nav-pills px-0 py-0 menubar">
                       <li className="nav-item menubar-item">
                           <a className="nav-link active" data-toggle="pill" href="#mobile-dashboard" data-toggle="tooltip" data-placement="top" title="Dashboard"><i className="fa fa-home"></i></a>
                       </li>  

                       <li className="nav-item menubar-item">
                           <a className="nav-link" data-toggle="pill" href="#mobile-inventory" data-toggle="tooltip" data-placement="top" title="Inventory"><i className="bx bx-notepad"></i></a>                                    
                       </li>  

                       <button className="btn btn-danger mb-2 px-3 py-0 logoutBtn"><i className="bx bx-log-out"></i></button>
                   </ul>
                 </div>                

               {/*CONTENT*/}
               <div className="container-fluid mobile-content tab-content" data-aos="zoom-in">
                 
                 {/*MOBILE DASHBOARD*/}
                   <div className="container-fluid tab-pane pt-3" id="mobile-dashboard">
                       <h5>Welcome Back! <span className="name"></span></h5>
                       <div className="container-fluid mt-4">
                           <div className="card  sector px-0">
                               <div className="card-header"><b>Profile</b> <i className="editProfile fa fa-pencil" ></i></div>
                               <div className="card-body">
                                   <span className="email"></span><br/>
                                   <span className="name"></span><br/>                                    
                               </div>
                           </div>

                           <div className="card mt-4 sector px-0">
                               <div className="card-header"><b>Subscription</b></div>
                               <div className="card-body">
                                   <span className="subscriptionStatus"></span><br/>
                                   <span className="subscriptionType"></span><br/>
                                   Ends <span className="subscriptionEnd"></span>
                               </div>
                           </div>
                       </div>

                   </div>

                   {/*MOBILE INVENTORY SECTION*/}
                   <div className="container-fluid tab-pane active pt-3" id="mobile-inventory">
                       
                         {/*INVENTORY VIEW*/}
                         <div className="container-fluid inventoryView px-0 pt-4" id="inventoryView">

                           <form method="post" id="inventorySearchForm" className="mobile-inventorySearchForm">
                               <div className="container-fluid row">
                                   
                                       <input id="inventorySearchBar" className=" inventorySearchBar form-control mobile-searchBar" type="search" placeholder="Search for inventories" required/>                                    
                                   <button className="btn btn-warning text-light ml-0 mobile-searchBtn col-xs-3" type="submit">Submit</button>
                               </div>
                           </form>

                           <button id="inventorySearchBack" className="btn btn-danger inventorySearchBack mt-2" style={{display:"none"}}>Back</button><br/>
                           <h3 className=".searchName" style={{display:"none"}}>Name</h3>
                           <button className="btn btn-warning text-light newButton" onClick="newInventory()">New +</button>

                           <div className="container-fluid view mt-4 px-0 mobile-inventories" id="mobile-inventories">
{/*   
                               <div className="card ml-3 mt-3 px-0" style="background-color: green;color:white;">
                                   <div className="card-header" style="text-transform:capitalize;">
                                       Booking Inventory
                                   </div>
                                   <div className="card-body">
                                       2 items<br/>
                                       For monitoring business<br/>                                        
                                   </div>
                                   <div className="card-footer">
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="View Inventory" onClick="viewInventory('id')"><i className="fa fa-eye"></i></button>
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="Edit Inventory" onClick="editInventory('id')"><i className="fa fa-pencil"></i></button>
                                       <button className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete Inventory" onClick="deleteInventory('id')"><i className="fa fa-trash"></i></button>
                                       <button className="btn btn-warning text-light" data-toggle="tooltip" data-placement="top" title="View Inventory Timeline" onClick="viewInventoryTimeline('id')"><i className="bx bx-time"></i></button>
                                   </div>
                               </div>

                           */}


                               

                           </div>
                           <div className="container-fluid inventoryView mt-4 mobile-paginationInventory" id="mobile-paginationInventory">
                                   
                           </div>
                       </div>
                       

                       {/*INVENTORY TIMELINE VIEW*/}
                       <div className="container-fluid timelineView extra px-0 pt-4 inventoryTimelineView" id="inventoryTimelineView" style={{display:"none"}}>                                                    

                           <button className="btn btn-danger leaveExtra">Back</button>

                           <div className="container-fluid view row mt-4 px-0" id="timeline">
                               Timeline

                           <div className="container-fluid timelineView" id="paginationTimeline" style={{display:"none"}}>

                           </div>
                       </div>
                   
                       </div>

                       {/*ITEMS VIEW*/}
                       <div className="container-fluid itemView extra px-0 pt-4" id="itemView" style={{display:"none"}}>

                           <button className="btn btn-danger leaveExtra">Back</button>
                           <form method="post" id="itemSearchForm" className="mt-2">
                               <div className="container-fluid row">
                                   <div className="form-group col-lg-9 mr-0 pr-0">
                                       <input id="itemSearchBar" className="form-control searchBar" type="search" placeholder="Search for items" required/>
                                   </div>
                                   <button className="btn btn-warning text-light ml-0 searchBtn" type="submit">Submit</button>
                               </div>
                           </form>

                           <button className="btn btn-warning text-light" onClick="newItem()">New +</button>

                           <div className="container-fluid view row mt-4 px-0" id="items">
                                   ITEM

                               <div className="container-fluid itemView" id="paginationItem" style={{display:"none"}}>

                               </div>
                           </div>
                   
                       </div>

                   </div>
               </div>            
   
           </div>
   </div>