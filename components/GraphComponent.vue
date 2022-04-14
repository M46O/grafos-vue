<template>
  <div id="main" :style="{ width: '100%', height: '500px' }"></div>
</template>

<script>
module.exports = {
  data() {
    return {
      prueba: 1
    };
  },

  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("main"));

      let option;

      const data = [
        {
          fixed: true,
          x: myChart.getWidth() / 2,
          y: myChart.getHeight() / 2,
          symbolSize: 20,
          id: "-1",
        },
      ];
      const edges = [];

      option = {
        series: [
          {
            type: "graph",
            layout: "force",
            animation: false,
            data: data,
            force: {
              repulsion: 100,
              edgeLength: 5,
            },
            edges: edges,
          },
        ],
      };

      setInterval(function () {
        data.push({
          id: data.length + "",
        });

        let source = Math.round((data.length - 1) * Math.random());
        let target = Math.round((data.length - 1) * Math.random());

        if (source !== target) {
          edges.push({
            source: source,
            target: target,
          });
        }
        
        myChart.setOption({
          series: [
            {
              roam: true,
              data: data,
              edges: edges,
            },
          ],
        });
      }, 1500);

      option && myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>