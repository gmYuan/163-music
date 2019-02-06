{
  let view = {
    el: '.songList',
    template: ``,

    render(data){
      let {songs} = data
      let songlist = songs.map(songinfo => lisong = $("<li></li>").text(`${songinfo.name}`))
      $(this.el).empty()
      songlist.map( (liDom)=> {
        $(this.el).find(".active").removeClass('active')
        $(liDom).addClass('active')
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
    }
  }

  let controller ={
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
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