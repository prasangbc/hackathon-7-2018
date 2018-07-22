import {
    setLoading
} from './loadingIndicator.js';
import retrieveMentionedComments from './secretSauce.js';
import {
    updateKeywords,
    updateZipCode
} from './input.js'

const registerInputChangeHandlers = () => {
    $('input[name=search]').keyup(() => {
        updateKeywords($('input[name=search]').val())
        console.log(`update with ${$('input[name=search]').val()}`)
    })
    $('input[name=zip]').keyup(() =>
      updateZipCode($('input[name=zip]').val()))
}

const registerSubmitHandler = (buttonCss, onclick) => $(buttonCss).click(() => {
    setLoading(true);
    return onclick();
});

const registerModalHandlers = () => {
    $('body').on('click', '#send-map', () => {
        const phoneButton = $('#send-map');
        const latLong = `${phoneButton.data('lat')},${phoneButton.data('long')}`
        const message = `
          Here's a link to the restaurant that you requested:
          https://maps.google.com/maps?q=${latLong}
        `;
        const phone = $('#recipient').val();
        return fetch('/api/twilio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                number: phone
            })
        })
        .finally(() => $('#phone-modal').modal('hide'));
    });
    $('body').on('show.bs.modal', '#phone-modal', (event) => {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var lat = button.data('lat') // Extract info from data-* attributes
        var long = button.data('long') // Extract info from data-* attributes
        const sendButton = $('#send-map')
        sendButton.data('lat', lat)
        sendButton.data('long', long)
    });
}

const updateResults = () => {
    return fetch('/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            restaurants: retrieveMentionedComments.mergeResults
        })
    })
    .then(response => response.text())
    .then(html => Promise.resolve($('#results').replaceWith(html)))
    .catch((error) => {
        $('#results').text("Awwwww shiiiyet! Something went wrong.")
        console.error(error)
    })
    .finally(() => {
        setLoading(false)
    });
}

export {
    registerInputChangeHandlers,
    registerSubmitHandler,
    updateResults,
    registerModalHandlers
};
