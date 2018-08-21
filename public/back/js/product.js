$(function () {
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];
  //页面渲染
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
          //配置按钮文本
          itemTexts:function (type, page, current) {
            switch(type){
              case "page":
              return page ;
              case "first":
              return "首页";
              case "last":
              return "尾页";
              case "prev":
              return "上一页";
              case "next":
              return "下一页";
            }
          },
          //设置按钮提示文本
          tooltipTitles:function (type, page, current) {
            switch(type){
              case "page":
              return "前往"+page+"页" ;
              case "first":
              return "首页";
              case "last":
              return "尾页";
              case "prev":
              return "上一页";
              case "next":
              return "下一页";
            }
          },
          //按钮提示信息
          useBootstrapTooltip:true,
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
  }
  //模态框显示
  $(".lt-content button").click(function () {
    $("#addMotal").modal("show");
  })

  //下拉菜单申请后台参数
  $.ajax({
    type:"get",
    url:"/category/querySecondCategoryPaging",
    data:{
      page:1,
      pageSize:10
    },
    dataType:"json",
    success:function (info) {
      var secondStr = template("dropdownTpl",info);
      $(".dropdown-menu").html(secondStr)
    }

  })

  //事件委托a获取a的id，将a的文字赋值给按钮
  $(".dropdown-menu").on("click","a",function () {
    var text = $(this).text();
    var id = $(this).data("id");
    $("#dropdownText").text(text);
    $('[name="categoryId"]').val( id );
    
  })

  //配置图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e,data) {
      console.log(data.result);
      picArr.unshift(data.result);
      $("#imgBox").prepend('<img src="'+data.result.picAddr+'" width="100" alt="">');
      if(picArr.length>3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove()
      };
      if(picArr.length === 3){
      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
      }
    }
  })

  //表单校验
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName:{
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc:{
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num:{
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size:{
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice:{
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price:{
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      picStatus:{
        validators: {
          notEmpty: {
            message: "请选择3张图片"
          }
        }
      },
    }
  })

  //注册表单成功事件
  $("#form").on("success.form.bv",function (e) {
    //阻止默认提交
    e.preventDefault();
    //表单提交得到的参数字符串
    var params = $("#form").serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      dataType:"json",
      type:"post",
      url:"/product/addProduct",
      data:params,
      success:function (info) {
        if(info.success){
          $("#addMotal").modal("hide");  
          $("#form").data("bootstrapValidator").resetForm(true);
          currentPage = 1;
          render();
          // 手动重置, 下拉菜单
          $('#dropdownText').text("请选择二级分类")
          // 删除结构中的所有图片
          $('#imgBox img').remove();
          // 重置数组 picArr
          picArr = [];       
        }
      }
    })

  })





})