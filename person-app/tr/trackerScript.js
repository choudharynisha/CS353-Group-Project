
console.log("Hello");

document.addEventListener('DOMContentLoaded', () =>{
   // Energy Tracker 

   const oneE = document.querySelector('#oneE');
   const twoE = document.querySelector('#twoE');
   const threeE = document.querySelector('#threeE'); 
   const fourE = document.querySelector('#fourE');
   const fiveE = document.querySelector('#fivE'); 
   const sixE =document.querySelector('#sixE'); 
   const sevenE =document.querySelector('#sevE'); 
   const eigE = document.querySelector('#eighE'); 
   const ninE =document.querySelector('#ninE'); 
   const tenE = document.querySelector('#tenE'); 

    //Depression
    const oneD = document.querySelector('#oneD');
    const twoD = document.querySelector('#twoD');
    const threeD = document.querySelector('#threeD'); 
    const fourD = document.querySelector('#fourD');
    const fiveD = document.querySelector('#fivD'); 
    const sixD =document.querySelector('#sixD'); 
    const sevenD =document.querySelector('#sevD'); 
    const eigD = document.querySelector('#eighD'); 
    const ninD =document.querySelector('#ninD'); 
    const tenD = document.querySelector('#tenD'); 

    //Anxiety 
    const oneA = document.querySelector('#oneA');
    const twoA = document.querySelector('#twoA');
    const threeA = document.querySelector('#threeA'); 
    const fourA = document.querySelector('#fourA');
    const fiveA = document.querySelector('#fivA'); 
    const sixA =document.querySelector('#sixA'); 
    const sevenA =document.querySelector('#sevA'); 
    const eigA = document.querySelector('#eighA'); 
    const ninA =document.querySelector('#ninA'); 
    const tenA = document.querySelector('#tenA'); 

    //Stress
    const oneS = document.querySelector('#oneS');
    const twoS = document.querySelector('#twoS');
    const threeS = document.querySelector('#threeS'); 
    const fourS = document.querySelector('#fourS');
    const fiveS = document.querySelector('#fivS'); 
    const sixS =document.querySelector('#sixS'); 
    const sevenS =document.querySelector('#sevS'); 
    const eigS = document.querySelector('#eighS'); 
    const ninS =document.querySelector('#ninS'); 
    const tenS = document.querySelector('#tenS'); 

    //Motivation
    const oneM = document.querySelector('#oneM');
    const twoM = document.querySelector('#twoM');
    const threeM = document.querySelector('#threeM'); 
    const fourM = document.querySelector('#fourM');
    const fiveM = document.querySelector('#fivM'); 
    const sixM =document.querySelector('#sixM'); 
    const sevenM =document.querySelector('#sevM'); 
    const eigM = document.querySelector('#eighM'); 
    const ninM =document.querySelector('#ninM'); 
    const tenM = document.querySelector('#tenM'); 

    // submit
   const sub = document.querySelector('#submitB'); 
   const clear = document.querySelector('#clearB');
   const back = document.querySelector('#backb'); 
   
   oneE.addEventListener('click',()=>{
        document.getElementById("engeryRes").innerHTML = "1";
   });
   twoE.addEventListener('click',()=>{
    document.getElementById("engeryRes").innerHTML = "2";
    });
    threeE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "3";
    });
    fourE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "4";
    });
    fiveE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "5";
    });
    sixE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "6";
    });
    sevenE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "7";
    });
    eigE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "8";
    });
    ninE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "9";
    });
    tenE.addEventListener('click',()=> {
        document.getElementById("engeryRes").innerHTML = "10";
    });
   
    //Depression
    

    oneD.addEventListener('click',()=>{
        document.getElementById("DepRes").innerHTML = "1";
   });
   twoD.addEventListener('click',()=>{
    document.getElementById("DepRes").innerHTML = "2";
    });
    threeD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "3";
    });
    fourD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "4";
    });
    fiveD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "5";
    });
    sixD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "6";
    });
    sevenD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "7";
    });
    eigD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "8";
    });
    ninD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "9";
    });
    tenD.addEventListener('click',()=> {
        document.getElementById("DepRes").innerHTML = "10";
    });

    //Anxiety 
   
    oneA.addEventListener('click',()=>{
        document.getElementById("AnRes").innerHTML = "1";
   });
   twoA.addEventListener('click',()=>{
    document.getElementById("AnRes").innerHTML = "2";
    });
    threeA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "3";
    });
    fourA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "4";
    });
    fiveA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "5";
    });
    sixA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "6";
    });
    sevenA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "7";
    });
    eigA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "8";
    });
    ninA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "9";
    });
    tenA.addEventListener('click',()=> {
        document.getElementById("AnRes").innerHTML = "10";
    });

    //Stress

    oneS.addEventListener('click',()=>{
        document.getElementById("StressRes").innerHTML = "1";
   });
   twoS.addEventListener('click',()=>{
    document.getElementById("StressRes").innerHTML = "2";
    });
    threeS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "3";
    });
    fourS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "4";
    });
    fiveS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "5";
    });
    sixS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "6";
    });
    sevenS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "7";
    });
    eigS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "8";
    });
    ninS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "9";
    });
    tenS.addEventListener('click',()=> {
        document.getElementById("StressRes").innerHTML = "10";
    });

    //Motivation

    oneM.addEventListener('click',()=>{
        document.getElementById("MotRes").innerHTML = "1";
   });
   twoM.addEventListener('click',()=>{
    document.getElementById("MotRes").innerHTML = "2";
    });
    threeM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "3";
    });
    fourM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "4";
    });
    fiveM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "5";
    });
    sixM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "6";
    });
    sevenM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "7";
    });
    eigM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "8";
    });
    ninM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "9";
    });
    tenM.addEventListener('click',()=> {
        document.getElementById("MotRes").innerHTML = "10";
    });

    clear.addEventListener('click', ()=> {
        document.getElementById("MotRes").innerHTML =""; 
        document.getElementById("StressRes").innerHTML = "";
        document.getElementById("AnRes").innerHTML = "";
        document.getElementById("DepRes").innerHTML = "";
        document.getElementById("engeryRes").innerHTML = "";
    });

    back.addEventListener('click', ()=> {
        const form = document.createElement('form');
        form.method = "post"; 
        form.action ="/";
        document.body.appendChild(form);  
        form.submit(); 

    });

    sub.addEventListener('click',()=>{
        let e = parseInt (document.getElementById("engeryRes").innerText); 
        let d = parseInt (document.getElementById("DepRes").innerText); 
        let a  = parseInt (document.getElementById("AnRes").innerText); 
        let s = parseInt (document.getElementById("StressRes").innerText); 
        let m = parseInt (document.getElementById("MotRes").innerText); 
        
       // console.log(energy, depression, anxiety, stress, motivation); 

        const form = document.createElement('form');
                        form.method = "post"; 
                        // "/createDaily"
                        //"/createTrackerData"
                        form.action ="/createTrackerData";
                       
                        const enter = {"energy": e, "depression": d, "anxiety": a, "stress": s, "motivation": m}; 
                        
                
                        const trackers = document.createElement('input'); 
                        trackers.type='HIDDEN';
                        trackers.name = "trackers";
                        trackers.id= "trackers"; 
                        trackers.value = JSON.stringify(enter); 
                        
                       form.appendChild(trackers);           

                        
                

                        const user = document.createElement('input'); 
                        user.type='HIDDEN';
                        
                        user.value = "12345"; 
                        user.name = "userID";
                        user.id = "userID";

                        form.appendChild(user); 

                        //console.log(user.value); 

                        //var da = new Date(); 
                        const dat = document.createElement('input'); 
                        dat.type = 'HIDDEN';
                        dat.value = new Date(); 
                        dat.name = "date";
                        dat.id = "date";
                        //console.log(dat.value); 
                        form.appendChild(dat);

                        
                        console.log(dat.value);
                        console.log(user.value);
                        console.log(trackers.value);

                        document.body.appendChild(form);  
                    
                        console.log(form);


                        
                        
                    form.submit(); 

        //console.log(form.getAttribute('StressLevels')); 
    });

   /* var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.valu
}*/
});