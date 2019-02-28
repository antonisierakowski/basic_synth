import $ from "jquery";
import filter from './../app'

function handleControlPanel() {
    const $switches = $('.switch');
    $switches.on('change', event => {
        $switches.each( (i,e) => {
            $(e).removeClass('depressed')
        })
        $(event.target).addClass('depressed')
        
        if ($switches.eq(0).is(":checked")) {
            // tutaj jakies ustawionko
        } else if ($switches.eq(1).is(":checked")) {
            // tutaj jakies ustawionko
        } else if ($switches.eq(2).is(":checked")) {
            // tutaj jakies ustawionko
        } else if ($switches.eq(3).is(":checked")) {
            // tutaj jakies ustawionko
        }
    })

    const $attackInput = $('#attack')
    //console.log($attackInput)
    $attackInput.on('change', event => {
        // coś = $attackInput.val();
        console.log($attackInput.val())
    })

    const $releaseInput = $('#release')
    $releaseInput.on('change', event => {
        // coś = $releaseInput.val();
    })
    
    const $filterInput = $('#filter')
    $filterInput.on('change', event => {
        filter.frequency.input.value = $filterInput.val();
    })













}

export default handleControlPanel;