const knownUrls = {
    'https://example.com': { exists: true, type: 'file' },
    'https://reactjs.org': { exists: true, type: 'file' },
    'https://reactjs.org/docs': { exists: true, type: 'folder' },
};

function randomDelay() {
    return Math.floor(Math.random() * 500) + 300;
}

export function checkUrlISExist(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = knownUrls[url] || { exists: false };
            resolve(result);
        }, randomDelay());
    });
}