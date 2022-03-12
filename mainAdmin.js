$(function (){
    $("#submCT").on("click", function (){
        addCT();
    });
    $("#submCi").on("click", function (){
       addCy();
    });
    $("#submH").on("click", function (){
        addHt();
    });
    outCt();
    $("#selCt2").on("change", function (){
       if($("#selCt2").val() > 0)
           outCy($("#selCt2").val());
    });
    $("#tcont").on("click", ".ctlink", function (){
        outCtInfo($(this).attr("id"));
        $("#mStatTb").show();
    });
    $("#clear").on("click", function (){
        $("#mStatTb").hide();
        $("#mtcont").empty();
    });
    /*let searchParams = new URLSearchParams(url.search.substring(1));

    let adm = searchParams.get("admin");

    console.log("adm=" + adm);*/
    outTb();
});
function outCtInfo(id)
{
    $.getJSON("script.php?country="+id, function (rez){
        if(rez.status == "fail")
            alert(rez.message);
        console.log(rez.message);
        if(rez.cl.length>0)
        {
            let str = "";
            let num = 1;
            $("#mtcont").empty();
            $.each(rez.cl, function (){
                str += "<tr><td>"+num+"</td><td>"+this.name+"</td><td>"+this.phone+"</td><td>"+this.hotel+"</td><td>"+this.city+"</td><td>"+this.country+"</td></tr>";
                num++;
            });
            $("#mtcont").append(str);
        }
    });
}
function outTb()
{
    console.log("test");
    $.getJSON("script.php?mode=outtb", function (rez){
        if(rez.status == "fail")
            alert(rez.message);
        console.log("qwe");
        if(rez.cl.length>0)
        {

            let str = "";
            let num = 1;
            $("#tcont").empty();
            $.each(rez.cl, function (){
                str += "<tr><td>"+num+"</td><td><button class='ctlink' id="+this.id+">"+this.name+"</button></td><td>"+this.amount+"</td></tr>";
                num++;
            });
            $("#tcont").append(str);
        }
    });
}
function addCT()
{
    let data = $("#formCt").serializeArray();
    $.post($("#formCt").attr("action"), data, function (rez){
        if(rez.status == "fail")
        {
            alert(rez.message);
        }
        if(rez.status == "success")
        {
            alert(rez.message);
            outCt();
        }
    }, "json");


}
function addCy()
{
    let data = $("#formCi").serializeArray();
    $.post($("#formCi").attr("action"), data, function (rez){
        if(rez.status == "fail")
        {
            alert(rez.message);
        }
        if(rez.status == "success")
        {
            alert(rez.message);
        }
    }, "json");
}
function addHt()
{
    let data = $("#formH").serializeArray();
    $.post($("#formH").attr("action"), data, function (rez){
        if(rez.status == "fail")
        {
            alert(rez.message);
        }
        if(rez.status == "success")
        {
            alert(rez.message);
        }
    }, "json");
}
function outCt()
{
$.getJSON("script.php?mode=outct", function (rez){
    if(rez.status == "fail")
    {
        alert(rez.message);
    }
    if(rez.ct.length>0)
    {
        let str = "";
        $("#selCt").empty();
        $("#selCt2").empty();
        str = "<option value='0'>Choose County</option>";
        $("#selCt").append(str);
        $("#selCt2").append(str);
        $.each(rez.ct, function (){
           str = "<option value='"+this.id+"'>"+this.name+"</option>";
           $("#selCt").append(str);
           $("#selCt2").append(str);
        });
    }
});
}
function outCy(id)
{
    $.getJSON("script.php?mode=outci&id="+id, function (rez){
        if(rez.status == "fail")
        {
            alert(rez.message);
        }
        let str = "";
        $("#selCy").empty();
        $("#selCy").append("<option value=\"0\">Choose City</option>");
        $.each(rez.ci, function (){
            str = "<option value='"+this.id+"'>"+this.name+"</option>";
            $("#selCy").append(str);
        })
    });
}