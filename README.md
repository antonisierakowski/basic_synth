# basic_synth

## Introduction

A synthesizer (often abbreviated to synth) is an electronic musical instrument that generates audio signals that may be converted to sound. (~wikipedia)<br />
This app is a simple synthesizer made in HTML, CSS, jQuery, and, more importantly, tone.js framework, which lies at the very core of the audio engine. It was made as my final project for Coders Lab bootcamp (I passed, yay!).<br />
You can run the app at https://antonisierakowski.github.io/basic_synth/build/index.html
Due to the app's nature, it's not designed responsively and desktop usage is advised.

## How to Use

After opening the app, you're greeted with the main UI which consists of the upper section of sound shaping controls, and lower section of keys. You can immediately start playing sounds and tweaking the controls. In the bottom left corner there's a question mark icon, which will toggle the view containing some info about the app and the author.

### Playing sounds
You can play the sound in the following ways:
* By pressing the keys on your keyboard:<br />
The A, S, D, F, G, H, J, K keys correspond to whole tones of the octave (starting with C), and W, E, T, Y, U keys will play the corresponding halftones. Z and X keys let you switch your current octave to lower or higher, respectively. Unfortunately, due to JavaScript's handling of key events, each note will have fixed length, that can only be changed by one of the controls UI controls (more on that in the next section).
* by clicking the key icons on the UI:<br />
Those correspond to a whole octave. You can still switch your octaves with Z and X keys, and the note will play continously until you release the mouse button.

### Controlling parameters
* The four switches in the upper-left corner of the synth will change oscillator's waveshape and apply some subtle amp's ADSR envelope presets.
* The first slider beneath the switches will change the duration of the note triggered with your device's keyboard.
* The other slider beneath the switches will apply autofilter to the output sound.<br /><br />
To use the knobs mouse over them, and scroll your mouse/touchpad to adjust the value.
* The left knob will apply chorus/detuning to your oscillator output.
* The right knob adjusts reverb's wet setting (from completely dry to about 50% wet).
* The slider beneath the knobs controls low-pass filter's cutoff frequency.
The thin bar on the right acts as a dB meter. Looks cool, eh?

### Disclaimer
The SASS mixins that made it possible for me to have these juicy gfx were taken from http://robertvinluan.com/Ramsophone/. Talented people make magic with their CSS.
