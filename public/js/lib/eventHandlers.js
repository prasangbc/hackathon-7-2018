import {
    setLoading
} from './loadingIndicator.js';
import retrieveMentionedComments from './secretSauce.js';

const registerSubmitHandler = (onclick) => $('button[type=submit]').click(() => {
    setLoading(true);
    return onclick();
});

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
    registerSubmitHandler,
    updateResults
};
