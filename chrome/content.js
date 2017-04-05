var READ_STORIES = [];

async_get("stories", def=[]).then(function(stories) {
	console.log("Got stories; ");
	console.log(stories);
	READ_STORIES = stories;
});

/* Initialize bg css. */
function installCSS() {
	let blurCSS = ".github-story-container {padding:12px;} .github-story-img { width: 112px; height: 112px; border-radius: 12px; border: 1px solid gray; } #storiesContainer { display: flex; flex-direction: row; flex-wrap: wrap; padding: 12px; } .github-story-caption {font-size: 14px; text-align: center;} \n";
	let warningCSS = ".warning { text-align: center;}\n";
	let cssNode = document.createElement("style"); cssNode.innerHTML = blurCSS + warningCSS;
	$("body").append(cssNode);
}

function shouldRun() {
	/* Only run on pages that have repositories. */
	return $(".repository-meta-content").length > 0;
}

function main() {
	console.log("Running plugin..");

	/* Install CSS */
	installCSS();

	/* Initialize Stories Region */
	if ($("#storiesContainer").length == 0) {
		let container = document.createElement("div")
		container.id = "storiesContainer";
		$(".repository-meta-content").append(container);
	}
	$("#storiesContainer").empty();

	/* Fetch stories. */
	fetchStories().then(function(stories) {
		/* Add the stories to the DOM. */
		console.log("Got " + stories.length + " stories!");
		for (var i = 0; i < stories.length; i++) {
			if (READ_STORIES.indexOf(stories[i]["full-name"]) > -1) {
				console.log("Already viewed story.");
			} else {
				console.log("Showing new story!");
				addStoryToDOM(stories[i]);
			}
		}
	});
}

function addStoryToDOM(story) {
	/* valid props: */
	/* user, name, full-name, image, age */
	let storyDiv = $(document.createElement("div"));
	storyDiv.addClass("github-story-container");

	let storyImg = $(document.createElement("img"));
	storyImg.addClass("github-story-img");
	storyImg.attr('src', story["image"])

	let storyCap = $(document.createElement("p"));
	storyCap.addClass("github-story-caption");
	storyCap.addClass("message");
	storyCap.text(story["age"])

	storyDiv.append(storyImg);
	storyDiv.append(storyCap);

	storyDiv.click(function() {
		console.log("Clicked!");
		// maximize for viewing;
		let modal = document.createElement("div");
		modal.style.width = "100%";
		modal.style.height = "100%";
		modal.style.background = "rgba(0,0,0,0.4)";
		modal.style.zIndex = 100; // front.
		modal.style.position = "fixed";
		modal.style.left = 0;
		modal.style.top = 0;
		modal.style.display = "flex";
		modal.style.justifyContent = "center";

		let bigImg = document.createElement("img");
		bigImg.src = story["image"];
		bigImg.style.width = 800;
		bigImg.style.height = "auto";

		$(modal).append(bigImg);
		$("body").append(modal);
		
		$(modal).click(function() {
			$(modal).remove();
			markStoryViewed(story);
		});
	});

	$("#storiesContainer").append(storyDiv);
}

function markStoryViewed(story) {
	if (READ_STORIES.indexOf(story["full-name"]) == -1) {
		// mark it read if it's not read already.
		READ_STORIES.push(story["full-name"]);
	}
	// save it.
	async_put("stories", READ_STORIES).then(function() {
		console.log("Marked story " + story["full-name"] + " as read.");
	});

	// update UI.
	main();
}


// Only run if we're on a repository page. 
if (shouldRun()) {
	main();
}


