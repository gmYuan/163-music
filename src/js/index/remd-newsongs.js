{
	let view = {
		el: '#newsg-ul',
		render(data){
			let {songs} = data
			songs.map( (song) => {
				let $content = `
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
				$(this.el).append($content)
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

