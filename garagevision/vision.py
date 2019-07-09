import tensorflow as tf
import sys
import os
import time
import picamera

# play nice with CPU resources
os.nice(20)

# setup camera
camera = picamera.PiCamera()
camera.resolution = (320, 240)

#can the excessive logging
tf.logging.set_verbosity(tf.logging.FATAL)

# change this as you see fit
image_path = sys.argv[1]

# Loads label file, strips off carriage return
label_lines = [line.rstrip() for line 
                   in tf.gfile.GFile("garagevision/garagemaster_labels.txt")]

# Unpersists graph from file
with tf.gfile.FastGFile("garagevision/garagemaster_graph.pb", 'rb') as f:
    graph_def = tf.GraphDef()
    graph_def.ParseFromString(f.read())
    _ = tf.import_graph_def(graph_def, name='')

# Loop forever checking for changes
while True:
    count = 0
    # loop 10 times and then unload the model and reload to prevent memory leak
    while (count < 11):

        # take a photo
        camera.capture(image_path)

        # Read in the image_data
        image_data = tf.gfile.FastGFile(image_path, 'rb').read()
    
        with tf.Session() as sess:
            # Feed the image_data as input to the graph and get first prediction
            softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
    
            predictions = sess.run(softmax_tensor, \
                               {'DecodeJpeg/contents:0': image_data})
    
            # Sort to show labels of first prediction in order of confidence
            top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
    
            target = open('vision.log', 'w')
            target.truncate()
            target.write(label_lines[top_k[0]])
            target.close()
            time.sleep(15)
            count = count + 1



