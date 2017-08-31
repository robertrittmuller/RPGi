# Raspberry Pi Garage Interface (RPGi) 

A totally amazing software solution to AI-enable your garage door using a Raspberry Pi! 

## Current Features

 - Fully trained Tensorflow neural network to recognize if the garage door is open or closed using just the Raspberry Pi Camera!
 - "Iron Man" inspired UI that's designed to look awesome on your mobile phone.
 - Uses sockets.io for real-time UI updates.
 - In addition to the door status indicator, you can also view door status via the live camera feed.
 - Setup files needed to run as a service under Raspbian!

#### Future Features (Time Permitting)

 - Ability to send notifications when the garage door has been open beyond a set time limit.
 - Showing which users are connected in the UI.
 - Creating a cloud-friendly service that can be run independently from the garage door control itself for
 higher security and easy setup.
 - User account management!

## Technology

### Hardware
The hardware for this project is based on the Raspberry Pi B+ project board combined with the Raspberry Pi 
8 megapixel camera. Everything for the build was purchased off Amazon and is linked here for easy reference. 

 - [Raspberry Pi B Starter Kit (includes case)](https://www.amazon.com/gp/product/B01DMFQZXK/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
 - [Raspberry Pi Camera Module V2](https://www.amazon.com/gp/product/B01ER2SKFS/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
 - [Latest Raspberry Pi Camera Case](https://www.amazon.com/gp/product/B00IJZJKK4/ref=oh_aui_search_detailpage?ie=UTF8&psc=1)
 - [2-Channel Relay Module](https://www.amazon.com/gp/product/B0057OC6D8/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1) - Needed to trigger the garage door remote.
 - [32GB Class 10 Micro SDHC Card](https://www.amazon.com/gp/product/B00IVPU786/ref=oh_aui_detailpage_o03_s00?ie=UTF8&psc=1) - Don't make the same mistake as I did...max SD card size on Raspberry Pi B is 32GB!
 - [2x 40pcs Female to Female 2.54mm 0.1 in Jumper Wires](https://www.amazon.com/gp/product/B00GSE2S98/ref=oh_aui_detailpage_o07_s00?ie=UTF8&psc=1) - Needed to connect the relay to the Pi.
 
### Software
Server side, RPGi is built with Node.js and Tensorflow with the model being served via a python script.

The front-end is built with Hype and is designed to be used on iOS and Android mobile phones.

## Requirements

You need [Node.js](http://nodejs.org/download/) installed and you'll need
a Raspberry Pi that has been configured to toggle your garage door using an existing remote. More details can 
be found [here](https://coderwall.com/p/jsd5mw/raspberry-pi-garage-door-opener-with-garagepi).
You will also need to install [Tensorflow](https://www.tensorflow.org/install/) for the AI component to work. A good
guide on how to get Tensorflow working on the Raspberry Pi can be 
found [here](https://github.com/samjabrahams/tensorflow-on-raspberry-pi).

## Installation

```bash
$ git clone git@github.com:robertrittmuller/rpgi.git
$ cd rpgi
$ npm install
```


## Configuration

Simply edit `app.js`. The only configuration uses standard IP notation to control which IP address
ranges are allowed to connect.
 __Don't expose your garage UI out to the internet as there is no 
user access control! (Yet)__

## First time setup

__WARNING__: You need to have followed the instructions linked above on building the hardware components required
to interact with your garage door before this software will work correctly.

## Running in production

Two service configuration scripts have been included to make it easy to run RPGi as a service
under Raspian. Setup is easy.

```bash
$ sudo cp rpgi.service /lib/systemd/system/
$ sudo cp garagevision.service /lib/systemd/system/
$ sudo systemctl enable rpgi.service
$ sudo systemctl enable garagevision.service
$ sudo systemctl start rpgi
$ sudo systemctl start garagevision
```

## Screenshots!

<img align="left" src="https://github.com/robertrittmuller/RPGi/blob/master/screenshots/screen1.PNG" width=250>
<img align="left" src="https://github.com/robertrittmuller/RPGi/blob/master/screenshots/screen2.PNG" width=250> 
<img src="https://github.com/robertrittmuller/RPGi/blob/master/screenshots/screen3.PNG" width=250> 

## Have a question?

Any issues or questions (no matter how basic), open an issue. Please take the
initiative to read relevant documentation and be pro-active with debugging.

## Want to contribute?

Contributions are welcome. If you're changing something non-trivial, you may
want to submit an issue before creating a large pull request.

## License

MIT