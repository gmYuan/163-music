{

	let view = {
		el: '#remd',
		init(){
			this.$el = $(this.el)
		}
	}

	let model = {}

	let controller = {
		init(view,model){
			this.view = view
			this.model = model
			this.view.init()
			this.bindEventHub()
			this.loadModule()
		},
		bindEventHub(){
			window.eventHub.on("tabselect", (tabname) => {
				if (tabname === 'remd'){
					this.view.$el.addClass('show').removeClass('none')
				} else {
					this.view.$el.addClass('none').removeClass('show')
				}
			})
		},
		loadModule(){
			createModule("remd-songs")
			createModule("remd-newsongs")

			function createModule(moduleName){
				let script = document.createElement('script')
				script.src = `./js/index/${moduleName}.js`
				document.body.append(script)
			}
		}

	}

	controller.init(view, model)
}