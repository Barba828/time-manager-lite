Component({
  // options: {
  //   addGlobalClass: true
  // },
  properties: {
    title: {
      type: String
    },
    number: {
      type: String
    },
    disable: {
      type: Boolean,
      value: false
    },
    img: {
      type: String
    }
  },
  data: {
    slideButtons: null
  },
  ready: function () {
    this.setData({
      slideButtons: !this.properties.disable ? [{
        text: '完成',
      }, {
        text: '编辑',
      }, {
        text: '删除',
      }] : [{
        text: '恢复',
      }, {
        text: '删除',
      }],
    });
  }
})