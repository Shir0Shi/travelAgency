$(function (){
    outct();
    $("#selCt").on("change", function (){
        if($("#selCt").val() > 0)
            outCy($("#selCt").val());
    });
    $("#selCi").on("change", function (){
        if($("#selCi").val() > 0)
            outH($("#selCi").val());
    });
    $("#subm").on("click", function (){
        sendform();
    });
});

function sendform()
{
    let data = $("#orderForm").serializeArray();
    $.post($("#orderForm").attr("action"), data, function (rez){
        if(rez.status == "fail")
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
function outct()
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
            str = "<option value='0'>Choose County</option>";
            $("#selCt").append(str);
            $.each(rez.ct, function (){
                str = "<option value='"+this.id+"'>"+this.name+"</option>";
                $("#selCt").append(str);
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
        $("#selCi").empty();
        $("#selCi").append("<option value=\"0\">Choose City</option>");
        $.each(rez.ci, function (){
            str = "<option value='"+this.id+"'>"+this.name+"</option>";
            $("#selCi").append(str);
        })
    });
}
function outH(id)
{
    $.getJSON("script.php?mode=outh&id="+id, function (rez){
        if(rez.status == "fail")
        {
            alert(rez.message);
        }
        let str = "";
        $("#selH").empty();
        $("#selH").append("<option value=\"0\">Choose City</option>");
        $.each(rez.h, function (){
            str = "<option value='"+this.id+"'>"+this.name+this.stars+"</option>";
            $("#selH").append(str);
        })
    });
}