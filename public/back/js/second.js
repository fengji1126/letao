$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      url:"/category/querySecondCategoryPaging",
      success:function (info) {
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages:Math.ceil(info.total/info.size ),
          currentPage:info.page,
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $(".lt-content button").click(function () {
    $("#secondMotal").modal("show");
  })
})