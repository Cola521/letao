$(function(){

    // echarts
    var myChart1 = echarts.init(document.getElementById('main1'));
        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2017年注册人数'
            },
            //提示
            tooltip: {},

            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [1000, 1500, 2500, 1200, 600, 1700]
            }]
        };
        myChart1.setOption(option1);
      var myChart2 = echarts.init(document.getElementById('main2'));
      option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','李宁','新百伦','阿迪王']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'李宁'},
                    {value:135, name:'新百伦'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option2);
    $('.logout').on('click',function(){
        $('#loginModal').modal();
    });
    // 模态框
    $('.modal-footer button:nth-of-type(2)').on('click',function(){
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
            },
            error:function(){
                alert('错误')
            }
        });
    });
});
