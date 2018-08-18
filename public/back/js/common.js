//开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
})




//结束进度条
$(document).ajaxStop(function () {
  NProgress.done();
})
