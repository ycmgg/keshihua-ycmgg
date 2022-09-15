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

    initMapChart(data.provinceData)
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
                top: 25
            },
            {
                text: '男生',
                left: 'center',
                top: '50%'
            },
            {
                text: '女生',
                left: 'center',
                top: '90%'
            },
        ],
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '男生',
                type: 'pie',
                radius: ['20%', '30%'],
                center: ['50%', '35%'],
                data: val.map(itme => {
                    return {
                        value: itme.g_count,
                        name: itme.label
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
                radius: ['20%', '30%'],
                center: ['50%', '75%'],
                data: val.map(itme => {
                    return {
                        value: itme.b_count,
                        name: itme.label
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

function initMapChart(provinceData) {
    const myEchart = echarts.init(document.querySelector('#map'))
    const dataList = [
        { name: '南海诸岛', value: 0 },
        { name: '北京', value: 0 },
        { name: '天津', value: 0 },
        { name: '上海', value: 0 },
        { name: '重庆', value: 0 },
        { name: '河北', value: 0 },
        { name: '河南', value: 0 },
        { name: '云南', value: 0 },
        { name: '辽宁', value: 0 },
        { name: '黑龙江', value: 0 },
        { name: '湖南', value: 0 },
        { name: '安徽', value: 0 },
        { name: '山东', value: 0 },
        { name: '新疆', value: 0 },
        { name: '江苏', value: 0 },
        { name: '浙江', value: 0 },
        { name: '江西', value: 0 },
        { name: '湖北', value: 0 },
        { name: '广西', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '山西', value: 0 },
        { name: '内蒙古', value: 0 },
        { name: '陕西', value: 0 },
        { name: '吉林', value: 0 },
        { name: '福建', value: 0 },
        { name: '贵州', value: 0 },
        { name: '广东', value: 0 },
        { name: '青海', value: 0 },
        { name: '西藏', value: 0 },
        { name: '四川', value: 0 },
        { name: '宁夏', value: 0 },
        { name: '海南', value: 0 },
        { name: '台湾', value: 0 },
        { name: '香港', value: 0 },
        { name: '澳门', value: 0 },
    ]
    
    dataList.forEach(itme => {
       let sre = provinceData.find(val => {
            return val.name.replace(/省|回族自治区|吾尔自治区|壮族自治区|特别行政区|自治区/g, '') === itme.name
        })
       if(sre){
         itme.value = sre.value
       }
       
    })

    let option = {
        title: {
            text: '籍贯分布',
            top: 25,
            left: 10,
            textStyle: {
                fontSize: 16,
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} 位学员',
            borderColor: 'transparent',
            backgroundColor: 'rgba(0,0,0,0.5)',
            textStyle: {
                color: '#fff',
            },
        },
        visualMap: {
            min: 0,
            max: 6,
            left: 'left',
            bottom: '20',
            text: ['6', '0'],
            inRange: {
                color: ['#ffffff', '#0075F0'],
            },
            show: true,
            left: 40,
        },
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.0,
            label: {
                normal: {
                    show: true,
                    fontSize: '10',
                    color: 'rgba(0,0,0,0.7)',
                },
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    color: '#e0ffff',
                },
                emphasis: {
                    areaColor: '#34D39A',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        series: [
            {
                name: '籍贯分布',
                type: 'map',
                geoIndex: 0,
                data: dataList,
            },
        ],
    }
    myEchart.setOption(option)
}