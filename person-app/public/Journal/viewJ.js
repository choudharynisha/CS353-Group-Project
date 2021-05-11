//console.log("view"); 
let currentUser = '"1234"'; 

document.addEventListener('DOMContentLoaded', () =>{
let info = decodeURIComponent(document.cookie); 
info = info.replace('"',"");
let ca  = info.split('{');

let aw = [];
let toPrint =[];
//et ne = ca.split(',')
//console.log(ca); 
//console.log(typeof(ca[1]));

for (i =1; i < ca.length;i++)
{
    ca [i]= ca[i].replace('\"',"");
    ca [i]= ca[i].replace('"'," ");
    ca[i]= ca[i].substring(1,ca[i].length-1);
    //temp = ca[i]
    let temp = ca[i].split(","); 
    //temp = temp.replace('/"',"");
    aw.push(temp)

   
    //aw.push({"userID":  })
}
for(var i = 1; i < aw.length ; i++)
{
    //if(aw[i].contains("id"))
    //{
        
        // userID aw[i][1]
       // console.log(aw[i][1]);
       //aw[i][1] = aw[i][1].replace('"',"")

       // userID
        let userIDV = aw[i][1].split(":"); 
        //console.log(userIDV )

        // Date aw[i][2]
        let dateV = aw[i][2].split(":")
        //console.log(dateV); 

        // Entry aw[i][3]
        let entryV = aw[i][3].split(":")
        //console.log(entryV); 

        toPrint.push({"userID": userIDV[1], "date": dateV[1] + dateV[2]+ dateV[3], "entry" : entryV[1] });
        //console.log(toPrint)
    //}
}

for( let i= 0 ; i< toPrint.length; i++)
{
    //console.log(toPrint[i]);
   if(toPrint[i].userID === currentUser )
  {

       console.log(toPrint[i]); 
       toPrint[i].entry = toPrint[i].entry.replaceAll('"',"");
       document.getElementById("daytwo").innerText= toPrint[i].entry; 
   }
}



});
// document.getElementById("dayone"); 
// document.getElementById("daytwo"); 
// document.getElementById("daythree"); 
// document.getElementById("dayfour"); 
// document.getElementById("dayfive"); 
// document.getElementById("daysix"); 
// document.getElementById("dayseven"); 
//console.log(aw ); 