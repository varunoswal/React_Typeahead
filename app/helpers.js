var axios = require('axios');

var helpers = {
	getBooksList: function(query){
		var res = [];
		return axios.get("https://www.googleapis.com/books/v1/volumes?q="+ query +"&country=US&maxResults=5")
			  .then(function(response){	    
				var items = response.data['items'];
				if (response.status == 200 && items != undefined)
				{
					items.map(function(item){
						authorStr = "";
						if(item["volumeInfo"]["authors"] != undefined)
							authorStr = helpers.getAuthors(item["volumeInfo"]["authors"]);

						res.push({"title": item["volumeInfo"]["title"], "authorStr": authorStr, "link": item["accessInfo"]["webReaderLink"]});
					});
				}
				// console.log(res);					
				return res;					
			  })		 
			  .catch(function (err) {console.warn('Error in getBooksList: ', err)});
	},

	getAuthors: function(authorArr){
		var authorStr = " by ";
		var numAuthors = authorArr.length;
		for (var i = 0; i < numAuthors; i++)
		{
			authorStr += authorArr[i];
			if (numAuthors > 1 && i < numAuthors - 1)
				authorStr += ", ";		
		}
		return authorStr;
	}
};

module.exports = helpers;