{
  let view = {
    el: '#main',
    template: `
    <h3 class="mainTitle">新建歌曲</h3>
    <form class="form">
      <label class="row">
        <span>歌名</span>
        <input type="text">
      </label>
      <label class="row">
        <span>歌手</span>
        <input type="text">
      </label>
      <label class="row">
        <span>外链</span>
        <input type="text">
      </label>

      <input type="submit" value="保存" class="submit">
    </form>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  
  let model = {}

  let  controller ={
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)

      window.eventHub.on("upload", (data) => {
        console.log(data)

      })
    }

  }

  controller.init(view, model)
 
}