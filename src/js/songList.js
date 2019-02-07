{
  let view = {
    el: '.songList',
    template: ``,

    render(data){
      let {songs} = data
      let songlist = songs.map(songinfo => lisong = $("<li></li>").text(`${songinfo.name}`))
      $(this.el).empty()
      songlist.map( (liDom)=> {
        // $(this.el).find(".active").removeClass('active')
        // $(liDom).addClass('active')
        $(this.el).append(liDom)
      })   
    },

    clearActive(){
      $(this.el).find(".active").removeClass('active')
    }
  }
  
  let model= {
    data: {
      songs: [
        // {"name": xxx, "singer":xxx, "url": xxx}, 
        // {""}
      ]
    },
    // 从数据库中获取数据库 字段数据
    fetch(){
      let query = new AV.Query('Song')
      return query.find().then( (savedData) => { 
        this.data.songs = savedData.map( (song) => {
          return {...song.attributes} 
        })
      })
    }

  }

  let controller ={
    init(view, model){
      this.view = view
      this.model = model

      // this.view.render(this.model.data)
      this.model.fetch().then( () => {      // 从数据库中获取数据 + 存入本地model中
        this.view.render(this.model.data)
      }) 

      window.eventHub.on("upload", () => {
        this.view.clearActive()
      })

      window.eventHub.on("create", (songdata) => {
        this.model.data.songs.push(songdata)
        this.view.render(this.model.data)

      })
    }
    
  }

  controller.init(view, model)

}