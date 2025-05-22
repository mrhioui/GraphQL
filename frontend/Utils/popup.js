export function showPopup(message) {
    const popup = document.createElement('div');
    popup.id = 'popup';

    const messageSpan = document.createElement('span');
    messageSpan.id = 'popup-message';
    messageSpan.textContent = message;

    const closeBtn = document.createElement('button');
    const closeIcon = document.createElement('img');
    closeIcon.src = '../imgs/x.svg';
    closeBtn.appendChild(closeIcon);

    closeBtn.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(messageSpan);
    popup.appendChild(closeBtn);
    let popupdiv = document.getElementById('popups');
    popupdiv.innerHTML =""
    popupdiv.appendChild(popup)

    setTimeout(() => {
        popup.remove();
    }, 1300);
}