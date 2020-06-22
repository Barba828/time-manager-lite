Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    name: {
      type: String,
    },
    draw: {
      type: String,
    },
    size: {
      type: Number,
      value: 100,
    },
    backColor: {
      type: String,
      value: '#ccc'
    },
    lineColor: {
      type: String,
      value: '#1cbbb4'
    },
    lineWidth: {
      type: Number,
      value: 10,
    },
  },

  methods: {
    setCircle: function () {
      const {
        size,
        lineWidth
      } = this.properties
      let r = size / 2;
      let ctx = wx.createCanvasContext(this.properties.name, this);
      ctx.setLineWidth(lineWidth);
      ctx.setStrokeStyle(this.properties.backColor);
      ctx.setLineCap('round')
      ctx.beginPath();
      ctx.arc(r, r, r - lineWidth, 0, 2 * Math.PI, false); //(x,y,r)
      ctx.stroke(); //对当前路径进行描边
      ctx.draw();
      return this;
    },
    drawCircle: function (percentage) {
      const {
        size,
        lineWidth
      } = this.properties;
      let r = size / 2;
      let step = percentage * 2;
      // 使用 wx.createContext 获取绘图上下文 context  绘制彩色进度条圆环
      let context = wx.createCanvasContext(this.properties.draw, this);
      
      context.setLineWidth(lineWidth);
      context.setStrokeStyle(this.properties.lineColor);
      context.setLineCap('round');
      context.beginPath(); //开始一个新的路径
      context.arc(r, r, r - lineWidth, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke(); //对当前路径进行描边
      context.draw();
    },
    run: function (percentage = 1, time = 1000, interval = 10) {
      let unit = percentage / (time / interval);
      let tempPercent = 0;
      this.countTimer = setInterval(() => {
        if (tempPercent < percentage) {
          // 绘制彩色圆环进度条
          this.drawCircle(tempPercent)
          tempPercent += unit
        } else {
          clearInterval(this.countTimer);
        }
      }, interval)
    },
    longPress:function(event){
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setCircle();
    },
  },
})