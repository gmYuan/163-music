{
	let view = {
	 el: '#loading'
	}

	let model = {}

	let controller = {
	  init(view, model){
	    this.view = view
	    this.model = model
	    this.bindEventHub()
	  },

	  bindEventHub(){
	    window.eventHub.on("beforeUpload", () => {
	      $(this.view.el).addClass('active')
	    }),
	    window.eventHub.on("afterUpload", () => {
	      $(this.view.el).removeClass('active')
	    })
	  } 

	}

	controller.init(view, model)
}