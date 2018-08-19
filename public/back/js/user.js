$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;

  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function (info) {
        console.log(info);
        var htmlStar = template("tpl",info);
        $("tbody").html(htmlStar);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages:Math.ceil(info.total/info.size ),
          currentPage:info.page,
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render()
          }
        })
      }
    })
  }


  $("tbody").on("click",".btn",function() {
    // console.log(1);
    $("#userMotal").modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger")?0:1;
    
  })

  $("#submitbtn").click(function () {
    console.log(currentId);
    console.log(isDelete);
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function (info) {
        $("#userMotal").modal("hide");
        render();
      }
    })
    
  })


})