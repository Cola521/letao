$(function() {
    var page = 1;
    var pageSize = 3;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            dataType: "json",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info) {
                console.log(info);
                $('.table tbody').html(template('product', info));
                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page, //当前页
                    totalPages: Math.ceil(info.total / pageSize), //总页数
                    size: "normal", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function(event, originalEvent, type, c_page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = c_page;
                        render();
                    }
                });
            }
        });
    }
    // 模态框
    $('.addBtn').on('click', function() {
        $('.addModal').modal();
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataType: "json",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info) {
                console.log(info);
                $('.addModal .dropdown-menu').html(template('second', info));

            }
        });
    });
    $('.addModal .dropdown-menu').on('click', 'a', function() {
        $('.addModal .btn-group span:first-child').text($(this).text())
        $('.addModal .btn-group [name="brandId"]').val($(this).data('id'));
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
    });
    //上传图片插件
    var newArr = [];
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function(e, data) {
            // console.log(data);
                newArr.unshift(data.result.picAddr);
                $('.img').prepend('<img width="100" src='+data.result.picAddr+'>');
                if(newArr.length >= 3){
                    newArr.pop();
                    console.log($('#img img:last-child'));
                    $('#img img:last-child').remove();
                }
            console.log('newArr' + newArr);
        }
    });
    $('#form').bootstrapValidator({
        //指定效验时的图标,默认风格
        excluded: [],
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        //指定效验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId:{
                //效验规则
                validators:{
                    //不能为空
                    notEmpty:{
                        message:'请选择二级分类'
                    },
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'商品名称不能为空'
                    },
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'商品描述不能为空'
                    },
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'商品库存不能为空'
                    },
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'商品尺码不能为空'
                    },
                },
                //正则校验
                regexp: {
                    regexp: /^\d{2}-\d{2}$/,
                    message: '尺码格式, 必须是 32-40'
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'商品原价不能为空'
                    },
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'商品现价不能为空'
                    },
                }
            },
        }
    });
    $('#form').on("success.form.bv",function(e){
        // e.preventDefault();
        var str = $('#form').serialize();
        str += '&picName1' + '=' + newArr[0];
        str += '&picName2' + '=' + newArr[1];
        str += '&picName3' + '=' + newArr[2];
        console.log(str);
         $.ajax({
            type:'post',
            url:'/product/addProduct',
            dataType:"json",
            data:str,
            success:function(info){
                 console.log(info);
            // $('').html(template('',info));
            // 重置表单
            $('.addModal').modal('hide');
            $('#form').data("bootstrapValidator").resetForm( true );
            $('.addModal .btn-group span:first-child').text('请选择二级分类');
            newArr = [];
            render();
            }
        });
    });
});
