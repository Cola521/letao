$(function(){
/*
  * 1. 校验表单
  * 要求:
  *   1. 用户名不能为空, 且长度 2-6 位
  *   2. 密码不能为空, 密码的长度为 6-12 位
  * */
    $('#form').bootstrapValidator({
        //指定效验时的图标,默认风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        //指定效验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username:{
                //效验规则
                validators:{
                    //不能为空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在2到6之间'
                    },
                    callback: {
                       message: "用户名不存在"
                     }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须在2到6之间'
                    },
                    callback: {
                       message: "密码错误"
                     }
                }
            }
        }
    });
    //重置表单中设置过校验的内容，将隐藏所有错误提示和图标。
    $('[type="reset"]').on('click',function(){
        $("#form").data('bootstrapValidator').resetForm();
    });
    //当表单校验成功时，会触发success.form.bv事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            dataType:'json',
            data:$('#form').serialize(),
            success:function(info){
                console.log(info);
                if(info.error===1000){
                    $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
                }
                if(info.error===1001){
                    $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
                }
                if ( info.success ) {
                     location.href="index.html";
                }
            }
        })
    });
});
