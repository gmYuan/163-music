{
	let view = {
		el: '#newsg-ul',
		render(data){
			let {songs} = data
			let content = songs.map( (song) => {
				return `
				<a href="javascript:;" class="newsg-li">
				<div class="newsg-info">
				  <div class="newsg-title">${song.name}</div>
				  <div class="newsg-txt">
				    <i class="sq"></i>
				    <span> ${song.singer} - ${song.name}</span>
				  </div>
				</div>

				<div class="newsg-icon">
				  <i class="playicon"></i>
				</div>
				</a>
				`
			})
			
			
		}

	}

	let model = {
		data: {
			songs: [
        // {"name": xxx, "singer":xxx, "url": xxx, "id": xxx}, 
        // {""}
        ],
      },
      fetch(){
      	let query = new AV.Query('Song')
      	return query.find().then( (savedData) => { 
      		this.data.songs = savedData.map( (song) => {
      			return {id: song.id, ...song.attributes} 
      		})
      	})
      }

    }

	let controller = {
		init(view, model){
			this.view = view
			this.model = model
			this.model.fetch().then(() => {
				this.view.render(this.model.data)
			})
		}
	}

	controller.init(view, model)

}

