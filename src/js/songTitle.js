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
      this.view.render(this.model.data)
      this.view.active()

      this.bindEvents()
      this.bindEventHub()
     
    },

    bindEvents(){
      $(this.view.el).on('click', ()=> {
        this.view.active()
        window.eventHub.emit('new')     //new 点击标题区事件
      })
    },
    
    bindEventHub(){
      window.eventHub.on("upload", () => {this.view.active()})
      window.eventHub.on("select", (data) => {  // select 点击列表项事件
        if (data.selected){
          this.view.deactive()
        }
      })
    }

  }

  controller.init(view, model)
 
}