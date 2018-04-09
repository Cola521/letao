$(function(){
    var page = 1;
    var pageSize = 7;
    var total ;
     function render(){
         $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:"json",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                 console.log(info);
                 total = Math.ceil(info.total/pageSize);
                 $('.main_table tbody').html(template('firstTable',info));
                 $("#pagintor").bootstrapPaginator({
                       bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                       currentPage:page,//当前页
                       totalPages:total,//总页数
                       size:"normal",//设置控件的大小，mini, small, normal,large
                       onPageClicked:function(event, originalEvent, type,c_Page){
                         //为按钮绑定点击事件 page:当前点击的按钮值
                             page = c_Page;
                             render();
                       }
                 });
            }
        });
     }
     render();
     // 模态框
     $('#addBtn').on('click', function() {
         $('#addModal').modal();
     });
     // 效验add
     $('#form').bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      // excluded: [':disabled', ':hidden', ':not'],

      //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      //3. 指定校验字段
      fields: {
        //校验用户名，对应name表单的name属性
        categoryName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '分类名不能为空'
            }
            // ,
            //长度校验
            // stringLength: {
            //   min: 2,
            //   max: 6,
            //   message: '分类名长度必须在2到6之间'
            // },
            // //正则校验
            // regexp: {
            //   regexp: /^[a-zA-Z0-9_\.]+$/,
            //   message: '分类名由数字字母下划线和.组成'
            // }
          }
        }
      }

    });
    // addBtn的ajax
    // $('.modal-content button[type=submit]')
    $('#form').on("success.form.bv",function( e ){
        // alert($('#form').serialize())
         $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            dataType:"json",
            data:$('#form').serialize(),
            success:function(info){
                 console.log(info);
                 // $('').html(template('',info));
                 render();
                 $('#addModal').modal('hide');
                 $('#form').data("bootstrapValidator").resetForm(true);
            }
        });
    });
});
