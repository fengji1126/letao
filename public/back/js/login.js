$(function () {
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须在2-6位"
          }
        }
      },
      password: {
        validators:{
          message:"密码不能为空"
        },
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须在6-12位"
        }
      }
    }
  });






});

$("#form").on("success.form.bv",function () {
  e.preventDefault();
  console.log("表单校验被阻止");
  
})