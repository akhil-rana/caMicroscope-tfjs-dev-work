from pathlib import Path
from PIL import Image
import numpy as np
import sys

# Constants
TRAINING_PATH = "D:/OnGoing Work/TFJS/shape-recog/shapes"
SPRITE_SIZE = 60

# Initialization
x_data = []
y_data = []
final_image = np.array([])
y_offset = 0
new_im = Image.new('RGB', (SPRITE_SIZE*SPRITE_SIZE, 14900))

t = 0
sq = 0
c = 0
st = 0
# Load the training sprite by looping over every image file
for image_file in Path(TRAINING_PATH).glob("**/*.png"):

    # Load the current image file
    src_image = Image.open(image_file)
    # make it smaller
    downsized = src_image.resize((SPRITE_SIZE, SPRITE_SIZE))

    # get 1px high version
    pixels = list(downsized.getdata())
    smoosh = Image.new('RGB', (SPRITE_SIZE * SPRITE_SIZE, 1))
    smoosh.putdata(pixels)

    # store image
    x_data.append(smoosh)

    # for i in image_file.stem:
    #     print(i)

    # Use image path to build our answer key
    if "triangle" in image_file.stem:
        y_data.append(1)
        t += 1
    elif "square" in image_file.stem:
        y_data.append(2)
        sq += 1
    elif "circle" in image_file.stem:
        y_data.append(3)
        c += 1
    else:
        y_data.append(4)
        st += 1

print(t)
print(sq)
print(c)
print(st)

# Now randomize X and Y the same way before making data
# (the JS code splits then randomizes) DERP!!!
assert len(y_data) == len(x_data)
p = np.random.permutation(len(y_data))
npy = np.array(y_data)
shuffled_y = npy[p].tolist()

one_hot_y = []
# Build the data image and 1-hot encoded answer array
for idx in p:
    # build master sprite 1 pixel down at a time
    new_im.paste(x_data[idx], (0, y_offset))

    # build 1-hot encoded answer key
    if shuffled_y[y_offset] == 1:
        one_hot_y.append(1)
        one_hot_y.append(0)
        one_hot_y.append(0)
        one_hot_y.append(0)
    elif shuffled_y[y_offset] == 2:
        one_hot_y.append(0)
        one_hot_y.append(1)
        one_hot_y.append(0)
        one_hot_y.append(0)
    elif shuffled_y[y_offset] == 3:
        one_hot_y.append(0)
        one_hot_y.append(0)
        one_hot_y.append(1)
        one_hot_y.append(0)
    else:
        one_hot_y.append(0)
        one_hot_y.append(0)
        one_hot_y.append(0)
        one_hot_y.append(1)
    # NEEEEXXXXXXT
    y_offset += 1


# Save answers file (Y)
newFile = open("labels", "wb")
newFileByteArray = bytearray(one_hot_y)
bytesWritte = newFile.write(newFileByteArray)
# should be num classes * original answer key size
assert bytesWritte == (4 * len(y_data))

# Save Data Sprite (X)
# new_im = new_im.convert("RGBA")

pixdata = new_im.load()

# Clean the background noise, if color != white, then set to black.
# change with your color

for y in range(new_im.size[1]):
    for x in range(new_im.size[0]):
        if pixdata[x, y][0] == 255:
            pixdata[x, y] = (255, 255, 255)

new_im.save('./data.png')

# Good ol Debugging Stuff
# new_im.show()
# print(str(shuffled_y))
# print(str(one_hot_y))
