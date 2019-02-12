{
  let view = {
    el: '#main',
    template: `
    <h3 class="mainTitle">新建歌曲</h3>
    <form class="form">
      <label class="row">
        <span>歌名</span>
        <input type="text" name="name" value="__name__">
      </label>
      <label class="row">
        <span>歌手</span>
        <input type="text" name="singer" value="__singer__">
      </label>
      <label class="row">
        <span>外链</span>
        <input type="text" name="url" value="__url__">
      </label>

      <input type="submit" value="保存" class="submit">
    </form>
    `,
    render(data = {}) {
      let placehoder = ['name', 'singer', 'url']
      let content = this.template
      placehoder.map((string) => {
        content = content.replace(`__${string}__`, data[string] || '')
      })
      $(this.el).html(content)
    },
    init() {
      this.$el = $(this.el)
    },
    reset() {
      this.render()
    },
    showTitle(selected) {
      if (selected) {
        $(".mainTitle").text(`编辑歌曲`)
      }
    }

  }

  let model = {
    nowData: { "name": '', "singer": '', "url": '', "id": '' },

    create(data) {
      let Song = AV.Object.extend('Song')
      let song = new Song()
      for (let key in data) {
        song.set(`${key}`, `${data[key]}`)
      }

      return song.save().then((oneSong) => {
        let { id, attributes } = oneSong
        Object.assign(this.nowData, { id, ...attributes })
      }, (error) => {
        console.error(error)
      })
    }
  }

  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.init()       // 简化获取view.el的写法
      this.view.render(this.model.data)

      this.songsaved = false  // 歌曲是否保存标志位， 用于判断是 新建/更新歌曲
      this.id = ''            // 已存歌曲的id,用于 更新数据时使用

      this.bindEvents()
      this.bindEventHub()

    },

    createSong() {     // 新建歌曲
      let data = {}
      let formkey = ["name", "singer", "url"]
      formkey.map(string => {
        data[string] = this.view.$el.find(`input[name = ${string}]`).val()  //find中可以传入变量
      })

      this.model.create(data).then(() => {
        // this.view.render(this.model.nowData)
        this.view.reset()
        let modelData = JSON.parse(JSON.stringify(this.model.nowData))
        window.eventHub.emit("create", modelData)
      })

    },

    updateSong(songid){      // 更新歌曲
      song = AV.Object.createWithoutData('Song',songid);

      // 修改属性
      let data = {}
      let formkey = ["name", "singer", "url"]
      formkey.map(string => {
        data[string] = this.view.$el.find(`input[name = ${string}]`).val()  //find中可以传入变量
      })
      for (let key in data) {
        song.set(`${key}`, `${data[key]}`)
      }
      // 保存到云端
      song.save()
      // update 更新已存数据字段事件
      data.id = songid
      window.eventHub.emit("update", JSON.parse(JSON.stringify(data))) 

    },

    bindEvents() {
      this.view.$el.on("submit", "form", (e) => {
        e.preventDefault()

        if (this.songsaved) {
          //console.log("已经保存歌曲")
          this.updateSong(this.id)
        } else {
          //console.log("之前未保存歌曲")
          this.createSong()
        }
      })
    },

    bindEventHub() {
      window.eventHub.on("upload", (data) => {
        this.view.render(data)
        this.songsaved = false
      })

      window.eventHub.on("select", (data) => {     // select 点击列表项事件
        this.view.render(data)
        this.view.showTitle(data.selected)
        this.songsaved = true
        this.id = data.id     
      })

      window.eventHub.on('new', (data) => {    // new 点击标题区事件
        if (data) {  // 为真时则 清空表单内容
          this.view.render()
          this.songsaved = false
        }
      })
    }

  }

  controller.init(view, model)

}