{
	let view = {
		el: '#search',
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
		},
		bindEventHub(){
			window.eventHub.on("tabselect", (tabname) => {
				if (tabname === 'search'){
					this.view.$el.addClass('show').removeClass('none')
				} else {
					this.view.$el.addClass('none').removeClass('show')
				}
			})
		}

	}

	controller.init(view, model)
}