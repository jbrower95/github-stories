#!/usr/bin/python

import cv2
import sys
import random
import time
import os
import textwrap

import PIL
from PIL import ImageFont
from PIL import Image
from PIL import ImageDraw

# TODO: Don't hardcode this.
FONTS_DIR = "/Library/Fonts/"
fonts = filter(lambda x: "ttf" in x, os.listdir(FONTS_DIR))

def takePhoto(saveTo):
	camera_port = 0
	ramp_frames = 30
	camera = cv2.VideoCapture(camera_port)
	def get_image(): return camera.read()[1]
	for i in xrange(ramp_frames): temp = get_image()
	camera_capture = get_image()
	cv2.imwrite(saveTo, camera_capture)

def addCaptionToPhoto(filename, caption, font=None):
	if not font:
		font = getRandomFont()
	size = random.randint(25, 40)
	font = ImageFont.truetype(font, size)
	img = Image.open(filename)
	draw = ImageDraw.Draw(img)
	color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
	margin = offset = 40
	for line in textwrap.wrap(caption, width=30):
	    draw.text((margin, offset), line, color, font=font)
	    offset += font.getsize(line)[1]
	draw = ImageDraw.Draw(img)
	img.save(filename)
	return img

def getRandomFont():
	return FONTS_DIR + random.choice(fonts)

if __name__ == "__main__":
	if len(sys.argv) != 2: 
		print "Usage: ./photo.py <path>"
		print "Takes a webcam photo + saves to path."
	else:
		takePhoto(sys.argv[1])

