{
	let view = {
		el: '#song',

		render(data) {
			let {song} = data
			 $(this.el).find('.song-bg').css('background-image', `url(${song.cover})`)
			 $(this.el).find('.inner-cover').attr('src', `${song.cover}`)
			 $(this.el).find('.audio').attr('src', `${song.url}`)
		},
		play(){
			$(this.el).find('.audio')[0].play()
			$(this.el).find('.disc-play').addClass('none')

			$(this.el).find('.img-innerwrap').css('animation-play-state', 'running')
			$(this.el).find('.disc-light').css('animation-play-state', 'running')

		},
		pause(){
			$(this.el).find('.audio')[0].pause()
			$(this.el).find('.disc-play').removeClass('none')

			$(this.el).find('.img-innerwrap').css('animation-play-state', 'paused')
			$(this.el).find('.disc-light').css('animation-play-state', 'paused')
		}
	
	}

	let model = {
		data: {
			song:{
				// {"name": xxx, "singer":xxx, "url": xxx, "id": xxx, "cover": xxx}
			},
			playStatus: false
    },
    getsong(songid) {
    	var query = new AV.Query('Song');
    	return query.get(songid).then( (song) => {
    		Object.assign(this.data.song, {id: song.id, ...song.attributes})
    	}, (error) => {
      	console.log(error)
    	})
    }

	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.bindEvents()

			let songid = this.getsongid()
			this.model.getsong(songid).then( () => {
				this.view.render(this.model.data)
			})
		},
		bindEvents(){
			$(this.view.el).on('click', '.clickarea', ()=> {
				if (!this.model.data.playStatus){    //当播放状态为真时
					this.view.play()
					this.model.data.playStatus = true
					console.log("播放中")
				} else {
					this.view.pause()
					this.model.data.playStatus = false
					console.log("暂停中")
				}
			})
		},
		
		getsongid(){
			let search = window.location.search
			let id = ''
			if (search.indexOf('?') === 0){
				search = search.slice('1')
									.split('&')
									.filter( member => member) //去除空项
				  // search: ["id=5c23d", "lala=33"]
			  for (let i = 0; i < search.length; i++) {
			  	let result = search[i].split('=')
			  	// result 必然形为 ['id', '5c23d']2项
			  	let key = result[0]
			  	let value = result[1]
			  	if (key === 'id'){
			  		id = value
			  		break
			  	}
			  }
			}
			return id
		}  //对应getsongid

	}

	controller.init(view,model)
}