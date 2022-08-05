


$(()=>{
    if ( window.innerWidth < window.innerHeight ) {
        $("#code").css("height","49vh");
        $("#live").css("height","49vh");
        $("body").css("flex-direction","column")
        document.getElementById("code").style.fontSize = "28px";
    } else {
        $("#code").css("width","49vw");
        $("#live").css("width","49vw");
        $("body").css("flex-direction","row")
        document.getElementById("code").style.fontSize = "14px";
    }
    typing(document.getElementById("code"),css);

    document.getElementById("snow").style.display = "none";

})

