$(function () {
  
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      page:1,
      pageSize:5
    },
    dataType:"json",
    success:function (info) {
      console.log(info);
      var htmlStar = template("tpl",info);
      $("tbody").html(htmlStar);
    }
  })




})