var React = require('react');
var ReactDOM = require('react-dom');
var helpers = require('./helpers');

// A dropdown panel component that lists 5 books and is nested within Typeahead component
var Dropdown = React.createClass({
	render: function(){
		var index = 0;
		// Map each book retrieved as props to a list of items to be rendered
 		var listItems = this.props.books.map(function(book){
			return(
				<li key={index++}>
					<a href={book.link} target={"_blank"}>
						{ book.title + authorStr }
					</a>
				</li>
			);
		});

		return (
			<div className="panel panel-default collapse" id="dropdownColl">
				<div className="panel-body">
					<ul className="unstyled">
						{listItems}
					</ul>
				</div>
			</div>
		);
	}
});

var Typeahead = React.createClass({
	// Typeahead component's state holds current user input and list of books retrieved for that user input
	getInitialState: function() {
	  return {
	    usrInput: "",
	    books: []
	  };
	},

	// Called when change in user input occurs and call Google books API if current text input is valid
	update: function(){
		var _this = this;
		var txtInput = document.getElementById('txtInput').value; // Get user input
		if (txtInput.length > 0) // and last keystroke longer than some ms
		{
			var res = [];
			helpers.getBooksList(txtInput)
			   .then(function(results){
			  	$('#dropdownColl').collapse('show');
			  	_this.setState({books:results});
			  })
		}
		else
		{
			$('#dropdownColl').collapse('hide');
			this.setState({books:[]}); // resets state variable
		}
	},

    render: function(){
    	var books = this.state.books; // Passed as props to dropdown list each time a new state is set
        return (
            <div className="component">
				<div className="col-md-2"></div>
				<div className="col-md-8">
					<form className="form-horizontal">
						<div className="form-group">
							<input type="text" id="txtInput" className="form-control center-block textboxDiv" placeholder="Search Google Books" onChange={this.update} />
							<Dropdown books={books} />
						</div>
					</form>
				</div>
				<div className="col-md-2"></div>
            </div>            
        );
    }
});

ReactDOM.render(<Typeahead />, document.getElementById('typeahead')); // Main render call