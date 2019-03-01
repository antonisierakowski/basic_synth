import $ from "jquery";
import Tone from "tone";
import allKeys from './partials/keys'
// import handleControlPanel from './partials/control_panel'
import "./styles/main.scss";
import "./../images/github.png"
import "./../images/linkedin.png"
import "./../images/soundcloud.png"
import "./../images/speaker.png"


$( () => {
      const $body = $('body');
      const $dbMeter = $('#dbMeter')
      let curOct = 4;
      let curDur = 0.14;
      let synth = new Tone.PolySynth(10)
      synth.voices.forEach( e => {
            e.envelope.attack = 0.01;
            e.envelope.decay = 1;
            e.envelope.sustain = 1;
            e.envelope.release = 0.5;
            e.oscillator.type = 'triangle'

      })
      let filter = new Tone.Filter(10000, 'lowpass', -12)
      let chorus = new Tone.Chorus(1.4, 3, 1);
      let reverb = new Tone.Reverb(15);
      reverb.wet.value = (0);

      let autoFilter = new Tone.AutoFilter(0,16000).start();

      let dbMeter = new Tone.Meter(0.9);
      
      synth.output.output.gain.input.value = 0.5
      synth.chain(autoFilter, filter, chorus, reverb, dbMeter, Tone.Master);
      reverb.generate();
      


      handleKeyboard(curOct)

      function handleKeyboard(oct) {
            $body.off('keydown');
            $body.off('keyup');
            Object.values(allKeys).forEach(element => {

                  element.off('mousedown');  
            });     
                  
            addPressEvent(allKeys.cKey, 65, `C${oct}`, curDur)
            addPressEvent(allKeys.dKey, 83, `D${oct}`, curDur)
            addPressEvent(allKeys.eKey, 68, `E${oct}`, curDur)
            addPressEvent(allKeys.fKey, 70, `F${oct}`, curDur)
            addPressEvent(allKeys.gKey, 71, `G${oct}`, curDur)
            addPressEvent(allKeys.aKey, 72, `A${oct}`, curDur)
            addPressEvent(allKeys.bKey, 74, `B${oct}`, curDur)
            addPressEvent(allKeys.c2Key, 75, `C${oct+1}`, curDur)
            addPressEvent(allKeys.cSharpKey, 87, `C#${oct}`, curDur)
            addPressEvent(allKeys.dSharpKey, 69, `D#${oct}`, curDur)
            addPressEvent(allKeys.fSharpKey, 84, `F#${oct}`, curDur)
            addPressEvent(allKeys.gSharpKey, 89, `G#${oct}`, curDur)
            addPressEvent(allKeys.aSharpKey, 85, `A#${oct}`, curDur)
            $body.on('keyup', (eventOctChg) => {
                  if (eventOctChg.keyCode === 90) {
                        if ( curOct > 1 ) {
                              $body.off('keydown');
                              $body.off('keyup');
                              curOct--;
                              handleKeyboard(curOct)
                        }

                  }
                  if (eventOctChg.keyCode === 88) {
                        if ( curOct < 6 ) {
                              $body.off('keydown');
                              $body.off('keyup');
                              curOct++;
                              handleKeyboard(curOct)
                        }
                  }
            })
      
      }

      function addPressEvent(element, keycode, note, dur) {

            $body.on('keydown', (eventDown) => {
                  if (eventDown.keyCode === keycode) {

                        synth.triggerAttackRelease(note, dur);
                        $(element).addClass('depressed');
                        
                        $body.on('keyup', (eventUp) => {
                              if (eventUp.keyCode === keycode) {
                                    $(element).removeClass('depressed')
                              }
                        })
                  }

                  
            })

            element.on('mousedown', e => {
                  synth.triggerAttack(note);
                  element.addClass('depressed');
                  $body.one('mouseup', e => {
                        synth.triggerRelease(note);
                        element.removeClass('depressed');
                  })
            })
            
      }

      dbMeterOn();

      function dbMeterOn() {
            
            const intervalId = setInterval( () => {
                  if (dbMeter.getLevel() > -35) {
                        $dbMeter.css('height', `${Math.floor(getAppropriateValue(dbMeter.getLevel(), -35, 0, 0, 174))}px`)
                  } else if (dbMeter.getLevel() <= -30) {
                        $dbMeter.css('height', '0')
                        // clearInterval(intervalId)
                  }
            }, 50)
      }  

            




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
                              e.envelope.attack = 0.01;
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

            const $durInput = $('#duration')
            $durInput.on('input', event => {
                  curDur = $durInput.val();
                  handleKeyboard(curOct);
            })
            const $autoFilterInput = $('#autoFilter')
            $autoFilterInput.on('input', event => {
                  if ($autoFilterInput.val() < 10) {
                        autoFilter.baseFrequency = getAppropriateValue($autoFilterInput.val(), 1, 9, 10000, 4000);
                  } else if ($autoFilterInput.val() >= 10 && $autoFilterInput.val() < 50) {
                        autoFilter.baseFrequency = getAppropriateValue($autoFilterInput.val(), 10, 51, 4000, 1500);
                  } else if ($autoFilterInput.val() >= 50) {
                        autoFilter.baseFrequency = getAppropriateValue($autoFilterInput.val(), 50, 100, 1500, 400 );
                  }

                  
                  //autoFilter.octaves = getAppropriateValue($autoFilterInput.val(), 1, 100, 0, 0.3)
                  autoFilter.frequency.input.value = getAppropriateValue($autoFilterInput.val(), 1, 100, 0, 17)
            })
            
            const $filterInput = $('#filter')
            $filterInput.on('input', event => {
                  filter.frequency.input.value = $filterInput.val()*$filterInput.val();

            })




            const $reverbKnob = $('#reverb');
            let reverbDeg = 0;
            $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
            $reverbKnob.on('mouseover', (eventMouseOver) => {
                  $(window).on('mousewheel DOMMouseScroll', function(event){
                        event.preventDefault();
                        
                        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) { // SCROLL W DÓŁ
                              if (reverbDeg > 3) {
                                    reverbDeg -= 4;
                                    $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
                                    reverb.wet.input.value = getAppropriateValue(reverbDeg, 0, 352, 0, 0.4)
                                    
                              }
                        }
                        else { // SCROLL W GÓRĘ
                              if (reverbDeg < 349) {
                                    reverbDeg += 4;
                                    $reverbKnob.children().css('transform', 'rotate(' + reverbDeg + 'deg)');
                                    reverb.wet.input.value = getAppropriateValue(reverbDeg, 0, 352, 0, 0.4)
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

