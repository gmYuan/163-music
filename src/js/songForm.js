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
        <input type="text" name="singer">
      </label>
      <label class="row">
        <span>外链</span>
        <input type="text" name="link" value="__link__">
      </label>

      <input type="submit" value="保存" class="submit">
    </form>
    `,
    render(data = {}){
      let placehoder = ['name', 'link']
      let content = this.template
      placehoder.map((string) => {
        content = content.replace(`__${string}__`, data[string] || '') 
      })
      $(this.el).html(content)
      
    }
  }
  
  let model = {}

  let  controller ={
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)

      window.eventHub.on("upload", (data) => {
        this.view.render(data)

      })
    }

  }

  controller.init(view, model)
 
}