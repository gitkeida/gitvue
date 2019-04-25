(function(window,document){

    function remAuto (){
        var element = document.documentElement,
            i = 750,
            d = i / 100;

            function setFontSize () {
                var width = element.clientWidth;
                console.log(width)
                width > 640 && (width = 640);
                element.style.fontSize = width * 2 / d  + "px";
            };
            window.addEventListener && 
            (window.addEventListener("DOMContentLoaded",setFontSize),window.addEventListener("resize",setFontSize));
    }

    remAuto();

})(window,document)

