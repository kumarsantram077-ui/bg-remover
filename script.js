
function changeBg(type) {
    const bgContainer = document.getElementById('bg-container');

    if (type === 'manali') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'beach') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'clothes') {
        bgContainer.style.backgroundImage = "url('https://unsplash.com')";
    } 
    else if (type === 'reset') {
        bgContainer.style.backgroundImage = "none";
    }
}
