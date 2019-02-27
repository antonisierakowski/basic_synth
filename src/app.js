import $ from "jquery";
import Tone from "tone";
import $keys from './partials/keys'
// import './../keypress'
// SCSS
import "./styles/main.scss";


$( () => {
      const $body = $('body');
      let curOct = 2;
      let synth = new Tone.PolySynth(10)
      console.log(synth)
      let chorus = new Tone.Chorus(1.5, 3.5, 0.7);
      let reverb = new Tone.Reverb(20);


      synth.chain(chorus, reverb, Tone.Master);
      reverb.generate();
      reverb.wet.value = (0.2);


      handleKeyboard(curOct)

      function handleKeyboard(oct) {
            console.log(curOct)
            $body.off('keydown');
            $body.off('keyup');
            addPressEvent($keys.cKey, 65, `C${oct}`)
            addPressEvent($keys.dKey, 83, `D${oct}`)
            addPressEvent($keys.eKey, 68, `E${oct}`)
            addPressEvent($keys.fKey, 70, `F${oct}`)
            addPressEvent($keys.gKey, 71, `G${oct}`)
            addPressEvent($keys.aKey, 72, `A${oct}`)
            addPressEvent($keys.bKey, 74, `B${oct}`)
            addPressEvent($keys.c2Key, 75, `C${oct+1}`)
            addPressEvent($keys.cSharpKey, 87, `C#${oct}`)
            addPressEvent($keys.dSharpKey, 69, `D#${oct}`)
            addPressEvent($keys.fSharpKey, 84, `F#${oct}`)
            addPressEvent($keys.gSharpKey, 89, `G#${oct}`)
            addPressEvent($keys.aSharpKey, 85, `A#${oct}`)

            $body.on('keyup', () => {
                  if (event.keyCode === 90) {
                        curOct--;
                        handleKeyboard(curOct)
                  }
                  if (event.keyCode === 88) {
                        curOct++;
                        handleKeyboard(curOct)
                  }
            })
      }

      function addPressEvent(element, keycode, note) {

            $body.on('keydown', (eventDown) => {
                  if (eventDown.keyCode === keycode) {
                        synth.triggerAttackRelease(note, '8n');
                        $(element).addClass('depressed');
                        $body.on('keyup', (eventUp) => {
                              if (eventUp.keyCode === keycode) {
                                    $(element).removeClass('depressed')
                              }
                        })
                  }
            })
      }
  
})

