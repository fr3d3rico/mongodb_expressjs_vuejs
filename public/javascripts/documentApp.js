var app = new Vue({
  el: '#app',
  data: {
  	docs: [],
  	doc: {
  		_id: '',
  		name: ''
  	},
  	pagination: {},
  	message: ''
  },
  mounted: function() {
  	this.list();
  },
  methods: {
  	navigationBack: function() {
  		if( this.pagination.page > 1 ) {
  			this.pagination.page = parseInt(this.pagination.page) - parseInt(1);
  			this.list(this.pagination.page);
  		}
  	},
  	navigationForward: function() {
  		if( this.pagination.page < this.pagination.pages ) {
  			this.pagination.page = parseInt(this.pagination.page) + parseInt(1);
  			this.list(this.pagination.page);
  		}
  	},
  	newDoc: function() {
  		this.doc = {
  			_id: '',
  			name: ''
  		}
  	},
  	remove: function(id) {
  		fetch('http://localhost:3000/docs/remove', {
  			method: 'DELETE',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ _id: id })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			this.doc = responseJson;
  			this.list();
  			this.message = 'Document removed!';
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
  	},
  	find: function(id) {
  		fetch('http://localhost:3000/docs/find/' + id)
  		.then((response) => response.json())
  		.then((responseJson) => {
  			this.doc = responseJson[0];
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error);
  		});
  	},
  	addOrUpdate: function() {
  		if( this.doc._id !== undefined && this.doc._id != '' ) {
  			this.update();
  		}
  		else {
  			this.add();
  		}
  	},
  	update: function() {
  		fetch('http://localhost:3000/docs/update', {
  			method: 'PUT',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ _id: this.doc._id, name: this.doc.name })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			this.doc = responseJson;
  			this.message = 'Document updated!';
  			this.list();
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
  	},
  	add: function() {
  		fetch('http://localhost:3000/docs/add', {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ name: this.doc.name })
  		})
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			this.doc = responseJson;
  			this.message = 'Document added!';
  			this.list();
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
  	},
  	list: function(page = parseInt(1)) {
  		fetch('http://localhost:3000/docs/list/'+page)
  		.then((response) => response.json())
  		.then((responseJson) => { 
  			this.docs = responseJson.docs;
  			this.pagination = responseJson;
  			if( responseJson.length == 0 ) {
  				this.message = 'No document found!';
  			}
  		})
  		.catch( (error) => { 
  			this.message = error;
  			console.error(error); 
  		});
  	}
  }
});
