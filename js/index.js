document.addEventListener('DOMContentLoaded', async function () {
    let { data } = await axios.get('/dashboard')
    console.log(data)
    let overview = data.overview

    for (key in overview) {
        document.querySelector(`[name=${key}]`).innerHTML = overview[key]
    }

    initYearChart(data.year)

    initSalaryChart(data.salaryData)
})



function initYearChart(year) {
    const myChart = echarts.init(document.getElementById('line'))

    const option = {
        color: [
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: '#499FEE', // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: '#5D75F0', // 100% 处的颜色
                    },
                ],
            },
        ],
        grid: {
            top: '20%',
        },
        title: {
            text: '2022全学科薪资走势',
            textStyle: {
                fontSize: 22,
            },
            left: 'center',
            top: 10,
        },
        xAxis: {
            type: 'category',
            data: year.map(val => val.month),
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    type: 'dashed',
                },
            },
            axisLabel: {
                color: '#999',
            },
        },
        tooltip: {
            trigger: 'axis',
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        series: [
            {
                data: year.map(itme => itme.salary),
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 6,
                },
                symbolSize: 10,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#499FEE',
                        },
                        {
                            offset: 0.8,
                            color: 'rgba(255,255,255,0.2)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,255,255,0)',
                        },
                    ]),
                },
            }
        ]
    }

    myChart.setOption(option)
}

function initSalaryChart(salaryData) {
    const myChart = echarts.init(document.getElementById('salary'))

    const option ={
        title:{
          top:20,
          text:'班级薪资分布',
          left:'center',
          textStyle:{
            fontSize:22
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom:10,
          left: 'center'
        },
        series: [
          {
            name: '班级薪资分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: '40',
            //     fontWeight: 'bold'
            //   }
            // },
            labelLine: {
              show: false
            },
            data: salaryData.map(val => {
                return {
                    value:val.g_count + val.b_count,
                    name: val.label
                }
            })
          }
        ]
      }
    myChart.setOption(option)
}

