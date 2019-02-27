import $ from "jquery";

function handleControlBoard() {
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
    
    // $switches.eq(0).on('click', event => {
    //     $(event.target).toggleClass('depressed')
    // }) 
    // $switches.eq(1).on('click', event => {
    //     $(event.target).toggleClass('depressed')
    // }) 
    // $switches.eq(2).on('click', event => {
    //     $(event.target).toggleClass('depressed')
    // }) 
    // $switches.eq(3).on('click', event => {
    //     $(event.target).toggleClass('depressed')
    // }) 
}

export default handleControlBoard;