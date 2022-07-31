import cv2
import numpy as np
import os

# at first I tried FLASK but kept getting Bad Exception Error so I gave up on that

path = 'path to frames with folder'

lr = np.array([0, 0, 0])
ur = np.array([250, 250, 250])

id = 88
for f in os.listdir(path):
    img = cv2.imread(path + '\\' + f)
    img = cv2.resize(img, (31, 23), interpolation = cv2.INTER_AREA)
    img = cv2.inRange(img, lr, ur)

    for xa in range(31):
        img = np.delete(img, 0)

    for xl in range(31):
        img = np.delete(img, -1)

    txt_p = 'path to output frames\\' + f +'.txt'
    txt = open(txt_p, 'w')

    txt.write(str(id) + ',')

    for x in img:
        if x == 255:
            txt.write('1')
        else:
            txt.write('0')
		
    txt.close()

    print('frame = ' + f)

    id += 1
