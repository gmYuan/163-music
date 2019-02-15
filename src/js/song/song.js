{
	let view = {
		el: '#song',
		template: ``,
		render(data) {
			let {songs} = data
		}
	
	}

	let model = {
		data: {
			songs: [
        // {"name": xxx, "singer":xxx, "url": xxx, "id": xxx}, 
        // {""}
      ],
    },
    getsong(songid) {
    	var query = new AV.Query('Song');
    	return query.get(songid).then( (song) => {
    		Object.assign(this.data.songs, {id: song.id, ...song.attributes})
    	}, (error) => {
      	console.log(error)
    	})
    }

	}

	let controller = {
		init(view, model){
			this.view = view
			this.model = model

			let songid = this.getsongid()
			this.model.getsong(songid).then( () => {
				//this.view.render(this.model.data)
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