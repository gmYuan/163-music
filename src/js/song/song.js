{
	let view = {
		el: '#song',

		render(data) {
			let {song} = data

			$(this.el).find('.song-bg').css('background-image', `url(${song.cover})`)
			$(this.el).find('.inner-cover').attr('src', `${song.cover}`)
			$(this.el).find('.audio').attr('src', `${song.url}`)

			$(this.el).find('.song-name').text(`${song.name}`)
			$(this.el).find('.song-autr').text(`${song.singer}`)

			let {lyrics} = song
			let  reg = /\[(\d+.\d+.\d+)\]?(.*)/i   // 根据[]分解字符串
			let lyric = lyrics.split('\\n')
			// console.log(lyric)

			let $lyricdom = lyric.map( (string) => {
				let result = reg.exec(string)
				let temp = result[1].split(':')
				let datatime
				if (temp) {
					let minute = temp[0]
					let second = temp[1]
					datatime = (parseInt(minute,10)*60) + parseFloat(second)
				}
				
				$p = $('<p></p>')
				$p.text(result[2])
				$p.addClass('lritem')
				$p.attr('data-time', datatime)
				return $p
			})

			$(this.el).find('.song-lyric').append($lyricdom)
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
		},

		showlyrics(time){
			let allP = $(this.el).find('.lritem')
			let p 
			for(let i =0;i<allP.length;i++){
				if(i===allP.length-1){
					p = allP[i]
					break
				}else{
					let currentTime = allP.eq(i).attr('data-time')
					let nextTime = allP.eq(i+1).attr('data-time')
					if(currentTime <= time && time < nextTime){
						p = allP[i]
						break
					}
				}
			}

			let pHeight = p.getBoundingClientRect().top
			let linesHeight = $(this.el).find('.song-lyric')[0].getBoundingClientRect().top
			let height = pHeight - linesHeight
			$(this.el).find('.song-lyric').css({
				transform: `translateY(${- (height - 25)}px)`
			})
			$(p).addClass('active').siblings('.active').removeClass('active')
			
			
		}  //对应showlyrics
	
	}

	let model = {
		data: {
			song:{
				// {"name": xxx, "singer":xxx, "url": xxx, "id": xxx, "cover": xxx, "lyrics":xxx}
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
				} else {
					this.view.pause()
					this.model.data.playStatus = false
				}
			})

			$(this.view.el).find('.audio').on('ended', () => {
				this.view.pause()
				this.model.data.playStatus = false
			})

			$(this.view.el).find('.audio').on('timeupdate', (e) => {
				this.view.showlyrics(e.currentTarget.currentTime)
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