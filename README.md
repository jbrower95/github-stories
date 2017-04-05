# Github Stories

Ever get really excited about a commit?
Want to share that with the world?

With github stories (chrome plugin + git hook) you can see what your friends
are doing when they commit!

Usage::

0. Install dependencies (PIL + openCV).

	sudo pip install pil
	sudo pip install opencv-python

1. Install the git hook for your repository.

	Assuming your project is called 'Feedr' --

	Navigate to Feedr's github repository folder.

	~/Users/Justin/Feedr

	Navigate within the .git structure to

	~/Users/Justin/Feedr/.git/hooks

	If hooks doesn't exist, create it. It should exist, though.

	Copy the contents of the 'git' directory from this repository into your hook folder.
	Notice, a 'post-commit' hook is added. This is how we'll add to our 'story'.

2. Install the chrome extension.

	Download + install the 'Github Stories' chrome extension from the chrome app store.

3. Go to a repository which has github stories enabled.

	See what they're up to!

4. Notes - Implementation

	Stories are stored in "__stories" and receive their captions from fonts stored in
	/Library/Fonts. If you're not on OSX, you'll need to open up the git commit hook
	and look for /Library/Fonts and change it to your fonts directory. It shouldn't
	be that much extra work, though.

5. There are stories in this repository! 
LICENSE: MIT
Libraries used: jQuery

Disclaimer: I have no affiliation with Github and this is a purely free, fun product that kind of sucks. Please don't sue me :( 
