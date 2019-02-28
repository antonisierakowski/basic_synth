import $ from "jquery";
import Tone from "tone";
import $keys from './partials/keys'
// import handleControlPanel from './partials/control_panel'
import "./styles/main.scss";


$( () => {
      const $body = $('body');
      const $dbMeter = $('#dbMeter')
      let curOct = 4;
      let synth = new Tone.PolySynth(10)
      console.log(synth)
      synth.voices.forEach( e => {
            e.envelope.attack = 0.1;
            e.envelope.decay = 1;
            e.envelope.sustain = 1;
            e.envelope.release = 0.5;
            e.oscillator.type = 'triangle'
      })
      let filter = new Tone.Filter(16000, 'lowpass', -12)
      let chorus = new Tone.Chorus(1.9, 3, 1);
      
      let reverb = new Tone.Reverb(30);
      let dbMeter = new Tone.Meter(0.99);


      synth.chain(filter, chorus, reverb, dbMeter, Tone.Master);
      reverb.generate();
      reverb.wet.value = (0.2);


      handleKeyboard(curOct)

      function handleKeyboard(oct) {
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
            $body.on('keyup', (eventOctChg) => {
                  if (eventOctChg.keyCode === 90) {
                        curOct--;
                        handleKeyboard(curOct)
                  }
                  if (eventOctChg.keyCode === 88) {
                        curOct++;
                        handleKeyboard(curOct)
                  }
            })
      }

      function addPressEvent(element, keycode, note) {

            $body.on('keydown', (eventDown) => {
                  if (eventDown.keyCode === keycode) {
                        synth.triggerAttackRelease(note, '4n');
                        $(element).addClass('depressed');
                        

                  }
                  $body.on('keyup', (eventUp) => {
                        if (eventUp.keyCode === keycode) {
                              $(element).removeClass('depressed')
                        }
                  })
            })

      }


      $body.on('keypress', () => {
            const intervalId = setInterval( () => {
                  // console.log(dbMeter.getLevel())
                  if(dbMeter.getLevel() < -40) {
                        $dbMeter.css('height', '0')
                  } else {
                        $dbMeter.css('height', `${ 150 - ( Math.floor(dbMeter.getLevel()) * -4 ) }px`)
                  }
                  if (dbMeter.getLevel() < -50 && dbMeter.getLevel() !== -Infinity) {
                        clearInterval(intervalId);
                  }
            }, 20)
      })


      

      function handleControlPanel() {
            const $switches = $('.switch');
            $switches.on('change', event => {
                  $switches.each( (i,e) => {
                        $(e).removeClass('depressed')
                  })
                  $(event.target).addClass('depressed')
                                                                        //  PRESETY
                  if ($switches.eq(0).is(":checked")) {
                                                                        // DEFAULT
                        synth.voices.forEach( e => {
                              e.envelope.attack = 0.1;
                              e.envelope.decay = 1;
                              e.envelope.sustain = 1;
                              e.envelope.release = 0.5;
                              e.oscillator.type = 'triangle'
                        })

                  } else if ($switches.eq(1).is(":checked")) {
                                                                        // SAW
                        synth.voices.forEach( e => {
                              e.envelope.attack = 0.1;
                              e.envelope.decay = 1;
                              e.envelope.sustain = 1;
                              e.envelope.release = 0.5;
                              e.oscillator.type = 'sawtooth'
                        })

                  } else if ($switches.eq(2).is(":checked")) {
                                                                        // FM
                        synth.voices.forEach( e => {
                              e.envelope.attack = 0.1;
                              e.envelope.decay = 1;
                              e.envelope.sustain = 1;
                              e.envelope.release = 0.5;
                              e.oscillator.type = 'fmsine'
                        })
                        
                  } else if ($switches.eq(3).is(":checked")) {
                                                                        // SQUARE                    
                        synth.voices.forEach( e => {
                              e.envelope.attack = 0.5;
                              e.envelope.decay = 1;
                              e.envelope.sustain = 1;
                              e.envelope.release = 1.4;
                              e.oscillator.type = 'square'
                        })
                        
                  }
            })

            const $attackInput = $('#attack')
            $attackInput.on('input', event => {
                  synth.voices.forEach( e => {
                        e.envelope.attack = $attackInput.val();
                  })
            })
        
            const $releaseInput = $('#release')
            $releaseInput.on('input', event => {
                  synth.voices.forEach( e => {
                        e.envelope.decay = $releaseInput.val();
                        e.envelope.sustain = $releaseInput.val();
                        e.envelope.release = $releaseInput.val();
                  })
            })
            
            const $filterInput = $('#filter')
            $filterInput.on('input', event => {
                  filter.frequency.input.value = Math.floor($filterInput.val());
            })




            const $reverbKnob = $('#reverb');
            let reverbDeg = 200;
            $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
            $reverbKnob.on('mouseover', (eventMouseOver) => {
                  $(window).on('mousewheel DOMMouseScroll', function(event){
                        event.preventDefault();
                        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) { // SCROLL W DÓŁ
                              if (reverbDeg > 3) {
                                    reverbDeg -= 4;
                                    $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
                                    reverb.wet.input.value = getAppropriateValue(reverbDeg, 0, 352, 0, 1)
                                    
                              }
                        }
                        else { // SCROLL W GÓRĘ
                              if (reverbDeg < 349) {
                                    reverbDeg += 4;
                                    $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
                                    reverb.wet.input.value = getAppropriateValue(reverbDeg, 0, 352, 0, 0.5)
                              }

                        }
                  });
                  $reverbKnob.on('mouseleave', () => {
                        $(window).off('mousewheel DOMMouseScroll')
                  })
            })

            const $chorusKnob = $('#chorus');
            chorus.wet.input.value = 0;
            let chorusDeg = 0;

            $chorusKnob.on('mouseover', (eventMouseOver) => {
                  $(window).on('mousewheel DOMMouseScroll', function(event){
                        event.preventDefault();
                        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) { // SCROLL W DÓŁ
                              if (chorusDeg > 3) {
                                    chorusDeg -= 4;
                                    $chorusKnob.children().css('transform', 'rotate(' + chorusDeg + 'deg)');
                                    chorus.wet.input.value = getAppropriateValue(chorusDeg, 0, 352, 0, 1)
                              }
                        }
                        else { // SCROLL W GÓRĘ
                              if (chorusDeg < 349) {
                                    chorusDeg += 4;
                                    $chorusKnob.children().css('transform', 'rotate(' + chorusDeg + 'deg)');
                                    chorus.wet.input.value = getAppropriateValue(chorusDeg, 0, 352, 0, 0.5)
                              }

                        }
                  });
                  $chorusKnob.on('mouseleave', () => {
                        $(window).off('mousewheel DOMMouseScroll')
                  })
            })


      }

      handleControlPanel();

      function getAppropriateValue(num, min1, max1, min2, max2) {
            return (((num - min1) * (max2 - min2)) / (max1 - min1)) + min2
      };


      const $showInfoBtn = $('#showInfo');
      const $info = $('#info')
      $showInfoBtn.on('click', () => {
            $info.toggleClass('hidden');
      })
})

