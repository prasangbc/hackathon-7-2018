import {
    setLoading
} from './loadingIndicator.js';
import retrieveMentionedComments from './secretSauce.js';

const registerSubmitHandler = () => $('button[type=submit]').click(() => {
    setLoading(true);
    fetch('/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            restaurants: retrieveMentionedComments.mergeResults || [{
                name: "Prasang's restaurant",
                address: '420 High street, Nirvana, USA'
            }, {
                name: "Varun's restaurant",
                address: '420 High street, Nirvana, USA'
            }]
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
});

export {
    registerSubmitHandler
};
