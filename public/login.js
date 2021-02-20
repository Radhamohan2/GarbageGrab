$(document).ready(function(){
$("#regForm").click(function(){
    var uname  = $("#uname").val();
    var upass = $("#upass").val();
    var uemail  = $("#uemail").val();
    var umssg = $("#umssg").val();
    var umsssg = $("#umsssg").val();
    var regData ={'name': uname,'pass':upass,'email':uemail,'umssg':umssg,'umsssg':umsssg};
      $.ajax({
        type : 'POST',
        url : '/regiterToDb',
        data : regData,
        success: function(data){
        $("#indd").html(data);
        }
      });
  });
});