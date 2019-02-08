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

    activeItem(target){
      $(target).addClass('active').siblings().removeClass('active')


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
      this.selected = false    // 是否点击了列表区元素的 状态值标记
      
      // this.view.render(this.model.data)
      this.getAllSongs()     // 从数据库中获取歌曲数据 + 存入本地model中
      this.bindEvents()      // 事件绑定
      this.bindEventHub()   // 发布订阅事件
    },


    getAllSongs(){          // 从数据库中获取歌曲数据 + 存入本地model中
      this.model.fetch().then( () => {     
        this.view.render(this.model.data)
      })     
    },

    bindEvents(){
      $(this.view.el).on('click', 'li', (e) => {
        this.view.activeItem(e.target)

        this.selected = true   // 传出已点击列表元素 为真
        let data
        this.model.data.songs.map( (song) => {
          if (e.target.textContent === song.name){
            data = song
            data.selected = this.selected 
          }
        })
        window.eventHub.emit("select", JSON.parse(JSON.stringify(data)) )  //select 点击列表事件
      })
    
    },

    bindEventHub(){          // 发布订阅事件
      // upload 歌曲上传事件
      window.eventHub.on("upload", () => {
        this.view.clearActive()
      })

      // create 表单创建歌曲事件
      window.eventHub.on("create", (songdata) => {
        this.model.data.songs.push(songdata)
        this.view.render(this.model.data)
      })

      // new 点击标题区事件
      window.eventHub.on('new', () => {
        this.view.clearActive()
      })

    }
    
  }

  controller.init(view, model)

}