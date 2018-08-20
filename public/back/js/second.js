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
      dataType:"json",
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

  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:10,
    },
    dataType:"json",
    success:function (info) {
      var htmlStrs = template("dropdownTpl",info);
      $(".dropdown-menu").html(htmlStrs)
    }
  })

  //3.给下拉列表的a添加点击事件（通过事件委托绑定）
  $(".dropdown-menu").on("click","a",function () {
    //获取a的文本
    var text = $(this).text();
    //设置给下拉按钮
    $("#dropdownText").text(text);
    //获取a标签储存的分类id
    var id = $(this).data("id");
    //复制给name=“categoryId”的表单元素
    $('[name = "categoryId"]').val(id);
    //更新校验状态位校验通过状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
  })

  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e,data) {
      console.log(data.result.picAddr);
      var imgUrl = data.result.picAddr;
      $("#imgBox img").attr("src",imgUrl);
      //将地址设置给name="brandLogo"的input
      $('[name="brandLogo"]').val(imgUrl);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")      
    }
  })

  //5.表单校验初始化
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
    fields: {
      categoryId:{
        //配置校验规则
        validators:{
          //非空
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        //配置校验规则
        validators:{
          //非空
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      brandLogo:{
        //配置校验规则
        validators:{
          //非空
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  })

  //6.注册表单校验成功事件，阻止表单提交，通过ajax提交
  $("#form").on("success.form.bv",function (e) {
    e.preventDefault();

    //通过ajax提交
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      dataType:"json",
      data:$("#form").serialize(),
      success:function (info) {
        //关闭模态框
        $("#secondMotal").modal("hide");
        //重置表单内容和状态
        $("#form").data("bootstrapValidator").resetForm(true);
        currentPage = 1;
        render();
        $('#dropdownText').text("请选择1级分类")
        $('#imgBox img').attr("src", "images/none.png")        
      }
    })
  })

})