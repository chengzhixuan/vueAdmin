<template>
    <Container menuLeft="/echart">
        <template v-slot:main>
            <el-main class="RouterPage EchartLine">
                <div ref="dataView" class="LineChartView"></div>
                <div ref="dataViewBar" class="LineChartView"></div>
                <div ref="dataViewPie" class="LineChartView"></div>
            </el-main>
        </template>
    </Container>
</template>
<script setup>
import echart from '@/util/echart'
import { onMounted } from 'vue';
import { ref } from 'vue'
let dataView = ref(null);
let dataViewBar = ref(null)
let dataViewPie = ref(null)
onMounted(() => {
    let myChart = echart.init(dataView.value);
    let option = {
        title: {
            text: '多层折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['新增', '现有确诊', '死亡', '治愈', '总确诊']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '新增',
                type: 'line',
                stack: 'Total',
                data: [50, 45, 101, 134, 90, 77, 20]
            },
            {
                name: '治愈',
                type: 'line',
                stack: 'Total',
                data: [70, 66, 30, 56, 45, 76, 44]
            },
            {
                name: '现有确诊',
                type: 'line',
                stack: 'Total',
                data: [220, 180, 191, 234, 290, 256, 310]
            },
            {
                name: '死亡',
                type: 'line',
                stack: 'Total',
                data: [12, 6, 3, 24, 34, 27, 32]
            },
            {
                name: '总确诊',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);

    let bar = echart.init(dataViewBar.value);
    option = {
        title: {
            text: '柱状图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '新增',
                type: 'bar',
                barWidth: '10%',
                data: [50, 45, 101, 134, 90, 77, 20]
            },
            {
                name: '治愈',
                type: 'bar',
                barWidth: '10%',
                data: [70, 66, 30, 56, 45, 76, 44]
            },
            {
                name: '现有确诊',
                type: 'bar',
                barWidth: '10%',
                data: [220, 180, 191, 234, 290, 256, 310]
            },
            {
                name: '死亡',
                type: 'bar',
                barWidth: '10%',
                data: [12, 6, 3, 24, 34, 27, 32]
            },
            {
                name: '总确诊',
                type: 'bar',
                barWidth: '10%',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    bar.setOption(option);

    let pie = echart.init(dataViewPie.value);
    pie.setOption({
        title: {
            text: '饼图',
            subtext: '总确诊',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '总确诊',
                type: 'pie',
                radius: '60%',
                data: [
                    { value: 820, name: '1月' },
                    { value: 932, name: '2月' },
                    { value: 901, name: '3月' },
                    { value: 934, name: '4月' },
                    { value: 1290, name: '5月' },
                    { value: 1330, name: '6月' },
                    { value: 1320, name: '7月' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
})
</script>
<style lang="less" scoped>
.EchartLine {
    padding: 20px;
    align-items: flex-start;
    & > div {
        margin-bottom: 40rpx;
        width: 100%;
        height: 500px;
    }
}
</style>