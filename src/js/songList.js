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
    }
  }
  
  let model= {}

  let controller ={
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.APP.songLisy = controller
    }
    
  }

  controller.init(view, model)

}