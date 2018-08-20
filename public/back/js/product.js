$(function () {
  var currentPage = 1;
  var pageSize = 2;

  render();
  function render() {
    $.ajax({
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      url:"/product/queryProductDetailList",
      success:function (info) {
        console.log(info);
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);
        //分页初始化
        $("#paginator").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion:3,
          //当前页
          currentPage:info.page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //给页码添加点击事件
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render()
          }
        })
      }
    })

    $(".lt-content button").click(function () {
      $("#addMotal").modal("show");
    })
  }









})