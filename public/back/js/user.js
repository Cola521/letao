$(function() {
    var page = 1;
    var pageSize = 6;
    var total = 0;
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            dataType: "json",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info) {
                console.log(info);
                total = Math.ceil(info.total/pageSize);
                $('.table tbody').html(template('td', info));
                //分页
                $("#pagintor").bootstrapPaginator({
                      bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                      currentPage:page,//当前页
                      totalPages:total,//总页数
                      size:"normal",//设置控件的大小，mini, small, normal,large
                      onPageClicked:function(event, originalEvent, type,current){
                        page = current;
                        render();
                      }
                });
            }
        });
    }
    render();
    // 启用模态框
    var that;
    $('.table').on('click', 'tbody td', function() {
        $('#deleteModal').modal();
        that = $(this);
    })
    // 禁用启用
    $('#deleteModal .modal-footer button:nth-of-type(2)').on('click',function() {
        console.log(that);
        var id = that.data('id');
        var isDelete = that.data('delete');
        console.log(that.data('id'), that.data('delete'));
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            dataType: "json",
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function(info) {
                console.log('111');
                //$('').html(template('',info));
                render();
                // 关闭模态框
                $('#deleteModal').modal('hide');
            }
        });
    });

});
