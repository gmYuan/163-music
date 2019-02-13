{
	let view = {
		el: '#toptab',
		init(){
			this.$el = $(this.el)
		},

		tabactive(dom){
			$(dom).addClass('active')
				.siblings().removeClass('active')
		}

	}

	let model = {}

	let controller = {
		init(view,model){

			this.view = view
			this.model = model
			this.view.init()
			this.bindEvents()
		},
		bindEvents(){
			this.view.$el.on('click', 'a.tabtitle', (e) => {
				this.view.tabactive(e.currentTarget)
				window.eventHub.emit('tabselect', e.currentTarget.dataset.tabname)
				
			})
		}

	}

	controller.init(view, model)
}