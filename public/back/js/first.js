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
      url:"/category/queryTopCategoryPaging",
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
    $("#firstMotal").modal("show");
  })


  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "输入不能为空"
          },

        }
      },
      }
  })

  $("#form").on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "POST",
      data: $('#form').serialize(),
      success: function( info ) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#firstMotal').modal("hide");
          // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
          currentPage = 1;
          render();
  
          // 重置表单校验状态和 表单内容
          // 传 true 不仅可以重置 状态, 还可以重置内容
          $('#form').data("bootstrapValidator").resetForm( true );
        }
      }
    })
  })

})