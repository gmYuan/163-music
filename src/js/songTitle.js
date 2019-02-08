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
    }

  }

  let model = {}

  let controller = {
    init(view, model){
      this.view = view
      this.model= model
      this.view.render(this.model.data)
      this.view.active()

      this.bindEventHub()
     
    },

    bindEventHub(){
      window.eventHub.on("upload", () => {this.view.active()})
      window.eventHub.on("select", (data) => {
        if (data.selected){
          this.view.deactive()
        }
      })
    }

  }

  controller.init(view, model)
 
}