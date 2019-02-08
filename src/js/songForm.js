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

      this.bindEvents()
      this.bindEventHub()

    },

    bindEvents() {
      this.view.$el.on("submit", "form", (e) => {
        e.preventDefault()
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
      })
    },

    bindEventHub() {
      window.eventHub.on("upload", (data) => {
        this.view.render(data)
      })

      window.eventHub.on("select", (data)=> {
        this.view.render(data)
      })

    }

  }

  controller.init(view, model)

}