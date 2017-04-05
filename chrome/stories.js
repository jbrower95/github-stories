/* Code for fetching github __stories__ */

function fetchStories() {
	// check for stories link.
	return new Promise(function(resolve, reject) {
		let results = $("[title=__stories]");
		if (results.length > 0) {
			// we found it.
			let storiesNode = results[0];
			let storiesLink = storiesNode.href;

			console.log("Loading stories link...");

			/* Make a container to load the stories into. */
			if ($("#storiesLoadContainer").length == 0) {
				let container = document.createElement("div");
				container.id = "storiesLoadContainer";
				$("body").append(container);
			}
			$("#storiesLoadContainer").empty();

			$( "#storiesLoadContainer" ).load(storiesLink + " .js-active-navigation-container", function() {
			  console.log("Loaded stories into #storiesLoadContainer.");

			  let stories = [];

			  $(".js-navigation-item", "#storiesLoadContainer").each(function() {
			  	if ($(this).hasClass("up-tree")) {
			  		// this is the ".."
			  		return;
			  	} else {
			  		// is a story!
			  		let story = {};

			  		let a = $($(".js-navigation-open", this)[0]);
			  		let fname = a.prop('title');
			  		let link = a.prop('href');
			  		
			  		story["user"] = fname.split("-")[0];
			  		story["name"] = fname.split("-")[1];
			  		story["full-name"] = fname;
			  		story["image"] = link + "?raw=true";
			  		story["age"] = $($(".age",this)[0]).text();

			  		stories.push(story);
			  	}
			  });

			  $("#storiesLoadContainer").empty();

			  resolve(stories);
			});

		} else {
			reject("Stories is not available on this repository (No __stories node found).");
		}
	});
}
