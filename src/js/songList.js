{
  let view = {
    el: '.songList',
    template: `
    <li>歌曲1</li>
    <li class="active">歌曲222222222222</li>
    <li>歌曲33333</li>
    `,
    render(data){
      $(this.el).html(this.template)
    },
    clearActive(){
      $(this.el).find(".active").removeClass('active')
    }
  }
  
  let model= {}

  let controller ={
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.eventHub.on("upload", () => {
        this.view.clearActive()
      })
    }
    
  }

  controller.init(view, model)

}