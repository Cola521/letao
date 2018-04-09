$(function(){
    var page = 1;
    var pageSize = 3;
    var total ;
    function render(){
         $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            dataType:"json",
            data:{
                page : page,
                pageSize : pageSize
            },
            success:function(info){
                 console.log(info);
                 total = Math.ceil(info.total/pageSize);
                 $('.table tbody').html(template('secondTable',info));
                 //分页
                 $("#pagintor").bootstrapPaginator({
                       bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                       currentPage:page,//当前页
                       totalPages:total,//总页数
                       size:"large",//设置控件的大小，mini, small, normal,large
                       onPageClicked:function(event, originalEvent, type,c_page){
                         //为按钮绑定点击事件 page:当前点击的按钮值
                         page = c_page;
                         render();
                       }
                 });
            }
        });
    }
    render();
    // 模态框
    var page2 = 1;
    var pageSize2 = 100;
    $('.addBtn').on('click', function() {
        $('.secondModal').modal();
        // 请求一级分类
         $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:"json",
            data:{
                page : page2,
                pageSize : pageSize2
            },
            success:function(info){
                console.log(info);
                $('.modal-body .dropdown-menu').html(template('first',info));

            }
        });
    });
    $('.modal-body .dropdown-menu ').on('click','a',function(){
        $('.dropdown input[name="categoryId"]').val($(this).data('id'));
        $('.dropdown button:first-child').html($(this).text()+'<span class="caret"></span>');
    });

    $("#fileupload").fileupload({
          dataType:"json",
          //e：事件对象
          //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
          done:function (e, data) {
            console.log(data);
            $('input[name="brandLogo"]').val(data.result.picAddr);
            $('.img img').attr('src',data.result.picAddr);
          }
    });
    // 表单效验
    $('#form1').bootstrapValidator({
    //指定效验时的图标,默认风格
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定效验字段
    fields: {
        // 校验用户名，对应name表单的name属性
        categoryId:{
            //效验规则
            validators:{
                //不能为空
                notEmpty:{
                    message:'不能为空'
                }
            }
        },
        brandName:{
            validators:{
                notEmpty:{
                    message:'不能为空'
                }
            }
        },
        brandLogo:{
            validators:{
                notEmpty:{
                    message:'不能为空'
                }
            }
        }
    }
    });
    // 添加
    $("#form1").on("success.form.bv", function( e ) {
   // 阻止默认的提交
   e.preventDefault();
         $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            dataType:"json",
            data:$('#form1').serialize(),
            success:function(info){
                 console.log(info);
                // 关闭模态框
               $('.secondModal').modal("hide");
               // 重置表单里面的内容和校验状态
               $('#form1').data("bootstrapValidator").resetForm( true );

               // 重新渲染第一页
               render();

               // 找到下拉菜单文本重置
               $('.dropdown button:first-child').text("请选择1级分类<span class='caret'></span>");

               // 找到图片重置
               $('.img img').attr("src", "images/none.png");
            }
        });
    });
});
