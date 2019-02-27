import $ from "jquery";
import Tone from "tone";
import $keys from './partials/keys'
// import './../keypress'
// SCSS
import "./styles/main.scss";


$( () => {
      const $body = $('body');
      let curOct = 4;
      // var listener = new window.keypress.Listener();



      let synth = new Tone.Synth();

      synth.chain(Tone.Master)

      addPressEvent($keys.cKey, 65, `C${curOct}`)
      addPressEvent($keys.dKey, 83, `D${curOct}`)
      addPressEvent($keys.eKey, 68, `E${curOct}`)
      addPressEvent($keys.fKey, 70, `F${curOct}`)
      addPressEvent($keys.gKey, 71, `G${curOct}`)
      addPressEvent($keys.aKey, 72, `A${curOct}`)
      addPressEvent($keys.bKey, 74, `B${curOct}`)
      addPressEvent($keys.c2Key, 75, `C${curOct+1}`)
      addPressEvent($keys.cSharpKey, 87, `C#${curOct}`)
      addPressEvent($keys.dSharpKey, 69, `D#${curOct}`)
      addPressEvent($keys.fSharpKey, 84, `F#${curOct}`)
      addPressEvent($keys.gSharpKey, 89, `G#${curOct}`)
      addPressEvent($keys.aSharpKey, 85, `A#${curOct}`)

      function addPressEvent(element, keycode, note) {
            $body.on('keydown', (eventDown) => {
                  if (eventDown.keyCode === keycode) {
                        synth.triggerAttackRelease(note)
                        $(element).addClass('depressed')
                        $body.on('keyup', (eventUp) => {
                              if (eventUp.keyCode === keycode) {
                                    $(element).removeClass('depressed')
                              }
                        })
                  }
            })
      }


   

      

  



      // }

      // function playNote(); {

      // }
  
})

