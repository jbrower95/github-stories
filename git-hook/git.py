import os
import subprocess

# Returns the commit hash of the most recent commit
def getMostRecentCommitHashAndMessage():
	output = subprocess.check_output(['git', 'log', '-1', 'HEAD'])
	lines = output.split("\n")
	commit_msg = "\n".join(lines[4:]).strip()
	commit_hash = output.split("\n")[0].split(" ")[1].strip() # take the first line
	return {"hash" : commit_hash, "msg" : commit_msg}

def addFile(file):
	subprocess.check_output(['git', 'add', file])

def amendPreviousCommit():
	subprocess.check_output(['touch', '.gh-no-execute'])
	subprocess.check_output(['git', 'commit', '--amend', '-C', 'HEAD'])

def getUserName():
	output = subprocess.check_output(['git', 'config', 'user.name'])
	return output.strip()