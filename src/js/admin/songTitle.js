{
  let view = {
    el: '.asideTitle',
    template: `
    新建歌曲
    `,
    render(data){
      $(this.el).html(this.template)
    },

    active(){
      $(this.el).addClass('active')  
    },

    deactive(){
      $(this.el).removeClass('active')  
    },

  }

  let model = {}

  let controller = {
    init(view, model){
      this.view = view
      this.model= model
      this.saved = true   // 用于判断是 已存数据库/新upload状态
      this.view.render(this.model.data)
      this.view.active()

      this.bindEvents()
      this.bindEventHub()
     
    },

    bindEvents(){
      $(this.view.el).on('click', ()=> {
        this.view.active()
        window.eventHub.emit('new',  this.saved)     //new 点击标题区事件
      })
    },
    
    bindEventHub(){
      window.eventHub.on("upload", (data) => {  //upload 上传事件
        this.view.active()
        this.saved = false
      })

      window.eventHub.on("select", (data) => {  // select 点击列表项事件
        if (data.selected){
          this.view.deactive()
          this.saved = true
        }
      })
    }

  }

  controller.init(view, model)
 
}