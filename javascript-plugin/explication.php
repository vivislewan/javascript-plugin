Include in your html two links :

Link of the CSS : 

<link rel="stylesheet" href="css/style.css">

Link of the script :

<script src="js/puce.js"></script>

In your html you need to include an element (div, link, or image) which have demo as id : 

Example : 
<p id="demo">Click me.</p>
  
<img id="demo" src="img/Postitadd.png" alt="Postitadd">

The code which create the postit 

postit = document.createElement("div");
postit.className = 'accordionItem';

 postithead = document.createElement("div");
postithead.className = 'accordionItemHeading';

  postitheadcontent = document.createElement("div");
postitheadcontent.className = 'headcontent';

postitcontent = document.createElement("TEXTAREA");
        postitcontent.className = 'accordionItemContent';

 postit.appendChild(postithead);
        postit.appendChild(postitheadcontent);
        postit.appendChild(postitcontent);
        document.body.appendChild(postit);

If you want a background color for your postit Add this code :

 var bgcolorList = new Array("#DFDFFF", "#FF8A2C", "#80FF80", "#FFE2A7", "#F62A42", "#8BD2DC", "#A68BD4", "#DDDD00");
        var rand = bgcolorList[Math.floor(Math.random() * bgcolorList.length)];
        postithead.style.background = rand;
postitcontent.style.background = rand;


If you want to have the possibility to delete your postit add this code :


        var deletelink = document.createElement('button');
        deletelink.innerHTML = 'X';
        deletelink.style.marginLeft = "50px";
        deletelink.onclick = function () {
            postit.remove();
        };
        deletelink.style.background = rand;

