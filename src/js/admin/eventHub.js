window.eventHub = {
  events: {
  	// "upload": [fn1, fn2...]
  },

  on(eventName, fn){
  	if (this.events[eventName] === undefined){
  		this.events[eventName] = []
  	}
  	this.events[eventName].push(fn)
  },

  emit(eventName, data){
  	for (let event in this.events){
  		if (eventName === event) {
  			fnList = this.events[event]
  			fnList.map( fn => {
  				fn.call(undefined, data)
  			})
  		}
  	}
  }


}


