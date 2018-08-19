//开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
})

//结束进度条
$(document).ajaxStop(function () {
  NProgress.done();
})

if(location.href.indexOf("login.html")===-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function (info) {
      if(info.success){
        console.log("用户已登录");
      }
      if(info.error === 400){
        location.href = "login.html"
      }
    }
  })
}




$(function () {
  //下拉菜单
  $(".category").click(function () {
    $(".child").stop().slideToggle();
  })
  //隐藏侧边栏
  $(".icon-menu").click(function () {
    $(".lt-aside").toggleClass("hidemenu");
    $(".lt-main").toggleClass("hidemenu");
    $(".lt-topbar").toggleClass("hidemenu")
  })

  //模态框
  $(".icon-logout").click(function () {
    $("#logoutMotal").modal("show")
  })
  //点击模态框的退出按钮
  $('#logoutbtn').click(function() {
    console.log("hehe");

    // 访问退出接口, 进行退出
     $.ajax({
       url: "/employee/employeeLogout",
       type: "GET",
       dataType: "json",
       success: function( info ) {

         if ( info.success ) {
           location.href = "login.html"
         }
       }
     })
  })
})


