console.log("Hello!"); 
document.addEventListener('DOMContentLoaded', () =>{
const week = document.querySelector('#weeklyb'); 
const month = document.querySelector('#Monthlyb'); 
const year = document.querySelector('#yearlyb');
const clear = document.querySelector('#clearB');
const back = document.querySelector('#backb'); 

const finished = document.querySelector('#submitB');
let typeOfG = null; 
    week.addEventListener('click',()=>{
        //console.log("You choose weekly goal");
        document.getElementById("weeklyb").style.outlineColor = "black"; 
        document.getElementById("Monthlyb").style.outlineColor = "rgb(179, 21, 131)";
        document.getElementById("yearlyb").style.outlineColor = "rgb(79, 5, 114)";
        typeOfG = "weekly";
        });
    month.addEventListener('click',()=>{
        //console.log("You choosea monthly goal");
        document.getElementById("weeklyb").style.outlineColor = "rgb(115, 114, 221)";
        document.getElementById("Monthlyb").style.outlineColor = "black";
        document.getElementById("yearlyb").style.outlineColor = "rgb(79, 5, 114)";
        typeOfG = "monthly"
    });
    year.addEventListener('click',()=>{
       //console.log("You choose a  yearly goal");
        document.getElementById("weeklyb").style.outlineColor = "rgb(115, 114, 221)";
        document.getElementById("Monthlyb").style.outlineColor = "rgb(179, 21, 131)";
        document.getElementById("yearlyb").style.outlineColor = "black";
        typeOfG = "yearly"
    });
    finished.addEventListener('click', ()=>{

            const writing = document.getElementById("typedGoal").value; 
            console.log(writing); 
            
            
            const form = document.createElement('form');
                        form.method = "post"; 
                        // "/createDaily"
                        //"/createTrackerData"
                        form.action ="/createGoalWeb";

                        const userID = document.createElement('input'); 
                        userID.type='HIDDEN';
                        userID.name = "userID";
                        userID.id= "userID"; 
                        userID.value = "12345789"; 

                        form.appendChild(userID); 

                       
                        const type = document.createElement('input');
                        if(typeOfG != null)
                        {
                            
                        
                        type.type='HIDDEN';
                        type.name = "type";
                        type.id= "type"; 
                        type.value = typeOfG; 

                        form.appendChild(type); 

                        if(writing != "")
                        {
                            const description = document.createElement('input'); 
                            description.type='HIDDEN';
                            description.name = "description";
                            description.id= "description"; 
                            description.value = writing; 
                            form.appendChild(description); 

                            document.body.appendChild(form); 

                            form.submit(); 
                        }
                        else
                        {
                            document.getElementById("des").style.color ="red" ;
                        }
                    }
                    else
                    {
                        document.getElementById("choose").style.color ="red" ;
                    }
    });

    back.addEventListener('click', ()=> {
        const form = document.createElement('form');
        form.method = "post"; 
        form.action ="/";
        document.body.appendChild(form);  
        form.submit(); 

    });

    clear.addEventListener('click', ()=> {
        document.getElementById("weeklyb").style.outlineColor = "rgb(115, 114, 221)";
        document.getElementById("Monthlyb").style.outlineColor = "rgb(179, 21, 131)";
        document.getElementById("yearlyb").style.outlineColor = "rgb(79, 5, 114)";
        typeOfG = null; 
       document.getElementById("typedGoal").value = ""; 
           

    });

   

});