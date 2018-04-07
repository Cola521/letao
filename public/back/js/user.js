$(function(){
    var page = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            dataType:"json",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $('.table thead').html(template('td',info));
            }
        });
    }
    render();
    // 禁用启用
    $('.table').on('click','thead td',function(){
        var id = $(this).data('id');
        var isDelete = $(this).data('delete');
        console.log($(this).data('id'),$(this).data('delete'));
         $.ajax({
            type:'post',
            url:'/user/updateUser',
            dataType:"json",
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                 console.log('111');
            //$('').html(template('',info));
            render();
            }
        });
    });
});
