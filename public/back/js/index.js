$(function(){
    // 二级分类
    $('.aside_nav li:nth-of-type(2)>a').on('click',function(){
        $('.aside_nav li .child').stop().slideToggle();
    });
    // aside
    $('.main_top a:first-child').on('click',function(){
        $('.aside').toggleClass('navChange');
        $('.main').toggleClass('mainChange');
    });
    // 退出
    $('.main_top a:nth-of-type(2)').on('click',function(){
        $.ajax({
            data:{},
            dataType:'json',
            url:'/employee/employeeLogout',
            type:'get',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = 'login.html';
                }else{
                    alert('错误');
                }
            }
        })
    })
});
