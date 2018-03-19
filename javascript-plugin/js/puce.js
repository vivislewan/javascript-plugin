document.addEventListener('DOMContentLoaded', function () {

    /*  Code permettant, au clique sur le boutton demo, de créer un postit */

    document.getElementById("demo").addEventListener("click", postit);

    function postit(event) {

        /* Code permettant de connaître la position de la souris 
            var x = event.pageX;
            var y = event.pageY;
            var coor = "coords: " + x + " coords: " + y;
            document.getElementById("contenu").innerHTML = coor;
        */

        /* Code permettant de créer un postit
        
        Code permettant de faire apparaître un postit à l'endroit du double clique, si jamais on veut faire apparaître un postit en double cliquant sur la page
        var x = event.pageX;
        var y = event.pageY;
        
        */

        /* ================= Div contenant le postit ============================= */

        postit = document.createElement("div");
        postit.className = 'accordionItem';
        /* postit.style.left = x + 'px';
        postit.style.top = y + 'px'; */
         

        /* ================= Div permettant de fermer et ouvrir un postit ============================= */

        postithead = document.createElement("div");
        postithead.className = 'accordionItemHeading';
        /* postithead.style.left = x + 'px';
        postithead.style.top = y + 'px'; 
        */


        postitheadcontent = document.createElement("div");
        postitheadcontent.className = 'headcontent';
        /* Change couleur aléatoirement à la création */

        var bgcolorList = new Array("#DFDFFF", "#FF8A2C", "#80FF80", "#FFE2A7", "#F62A42", "#8BD2DC", "#A68BD4", "#DDDD00");
        var rand = bgcolorList[Math.floor(Math.random() * bgcolorList.length)];
        postithead.style.background = rand;


        /* ================= Lien & fonction permettant de supprimer le postit ============================= */

        var deletelink = document.createElement('button');
        deletelink.innerHTML = 'X';
        deletelink.style.marginLeft = "50px";
        deletelink.onclick = function () {
            postit.remove();
        };
        deletelink.style.background = rand;

        postitheadcontent.appendChild(deletelink);

        /* ================= Area permettant de créer du contenu ============================= */
        postitcontent = document.createElement("TEXTAREA");
        postitcontent.className = 'accordionItemContent';
        /* postitcontent.style.left = x + 'px';
        postitcontent.style.top = y + 'px';
        */

        /* Change couleur aléatoirement à la création */

        postitcontent.style.background = rand;

        /* ================= Modélisation du postit ============================= */

        postit.appendChild(postithead);
        postit.appendChild(postitheadcontent);
        postit.appendChild(postitcontent);
        document.body.appendChild(postit);


        /* ================= Evenement selon l'élement choisi ============================= */

        var accordionhead = document.getElementsByClassName('accordionItemHeading');
        for (i = 0; i < accordionhead.length; i++) {
            accordionhead[i].addEventListener('click', toggleItem);
        }

        
        var accordionitem = document.getElementsByClassName('accordionItem');

        var accordionitem = document.getElementsByClassName('accordionItem');
        for (i = 0; i < accordionitem.length; i++) {
            accordionitem[i].addEventListener('dblclick', PostitMove);
        }

        /* ================= Fonction pour réduire le postit ===================== */


        function toggleItem() {
            var itemClass = this.parentNode.className;

            var accordionitem = document.getElementsByClassName('accordionItem');
            for (i = 0; i < accordionitem.length; i++) {
                accordionitem[i].className = 'accordionItem close';
            }
            if (itemClass == 'accordionItem close') {
                this.parentNode.className = 'accordionItem open';
            }
        }


        /* ================= Fonction pour mouvoir le postit sur la page ============================= */
        function PostitMove(evt) {

            var posX = evt.clientX - this.offsetLeft,
                posY = evt.clientY - this.offsetTop,
                that = this;

            function movePostit(evt) {
                that.style.left = (evt.clientX - posX) + 'px';
                that.style.top = (evt.clientY - posY) + 'px';
            }

            function stopMovepostit() {
                document.removeEventListener('mousemove', movePostit);
                document.removeEventListener('mouseup', stopMovepostit);
            }

            document.addEventListener('mouseup', stopMovepostit);
            document.addEventListener('mousemove', movePostit);
        }

        /* ================= Fonction pour mouvoir le postit sur la page ============================= */
        function startmovethepostit(evt) {
            if (evt.target.classList.contains('accordionItem')) {
                PostitMove.call(evt.target, evt);
            }
        }

        document.body.addEventListener('mousesdown', startmovethepostit);

    }

    
    /* choisir la couleur du textarea */
    
    var setCookie = function (n, val) {
        var exdays = 30;
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        postitcontent.cookie = n + "=" + val + "; " + expires;
    };

    var getCookie = function (n) {
        var name = n + "=";
        var ca = postitcontent.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    document.onclick = function (e) {
        if (e.target.className == 'btn') {
            var favColor = e.target.style.color;
            setCookie('color', favColor);
            postitcontent.style.color = favColor;
            console.log(favColor);
        }
    };

    window.onload = function () {
        var favColor = postit.style.color;
        var color = getCookie('color');
        if (color === '') {
            postitcontent.style.color = favColor;
        } else {
            postitcontent.style.color = color;
        }
    };

});