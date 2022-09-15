document.addEventListener('DOMContentLoaded', async function () {
    let { data } = await axios.get('/dashboard')
    console.log(data)
    let overview = data.overview

    for (key in overview) {
        document.querySelector(`[name=${key}]`).innerHTML = overview[key]
    }

    initYearChart(data.year)

    initSalaryChart(data.salaryData)

    initGroupChart(data.groupData)

    initGenderChart(data.salaryData)
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

    const option = {
        title: {
            top: 20,
            text: '班级薪资分布',
            left: 'center',
            textStyle: {
                fontSize: 22
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: 10,
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
                        value: val.g_count + val.b_count,
                        name: val.label
                    }
                })
            }
        ]
    }
    myChart.setOption(option)
}

function initGenderChart(val) {
    const myChart = echarts.init(document.getElementById('gender'))

    const option = {
        title: [
            {
                text: '男女薪资分布',
                left: 'center',
                top:25
           },
            {
                text: '男生',
                left: 'center',
                top: '50%'
           },
            {
                text: '女生',
                left: 'center',
                top:'90%'
           },
        ],
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '男生',
            type: 'pie',
            radius: ['20%','30%'],
            center:['50%','35%'],
            data: val.map(itme => {
                return {
                    value: itme.g_count,
                    name:itme.label
                }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'aqua'
              }
            }
          },
          {
            name: '女生',
            type: 'pie',
            radius: ['20%','30%'],
            center:['50%','75%'],
            data: val.map(itme => {
                return {
                    value: itme.b_count,
                    name:itme.label
                }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'red'
              }
            }
          }
        ]
      }

    myChart.setOption(option)
}

function initGroupChart(data) {
    const myChart = echarts.init(document.getElementById('lines'))

    const option = {
        grid: {
            left: 70,
            top: 30,
            right: 30,
            bottom: 50,
        },
        xAxis: {
            type: 'category',
            data: data[1].map(val => val.name),
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
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        tooltip: {
            trigger: 'item',
        },
        color: [
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: '#34D39A', // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: 'rgba(52,211,154,0.2)', // 100% 处的颜色
                    },
                ],
            },
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: '#499FEE', // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: 'rgba(73,159,238,0.2)', // 100% 处的颜色
                    },
                ],
            },
        ],
        series: [
            {
                name: '期望薪资',
                data: data[1].map(val => val.salary),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            },
            {
                name: '实际薪资',
                data: data[1].map(val => val.hope_salary),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    }

    myChart.setOption(option)

    document.querySelector('#btns').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.btn-blue').classList.remove('btn-blue')
            e.target.classList.add('btn-blue')
            let ind = e.target.innerHTML
            option.xAxis.data = data[ind].map(val => val.name)
            option.series[0].data = data[ind].map(val => val.salary)
            option.series[1].data = data[ind].map(val => val.hope_salary)
            myChart.setOption(option)
        }
    })
}
