// 
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const rijeci = ['Uspi', 'Briliraj', 'Zaiskri'];

document.addEventListener('DOMContentLoaded', () => {
    const ElementId = document.getElementById("TypewriterAnimation");

    // zaš ga ti je tako teško naći
    if (!ElementId) {
        console.error('Element with ID "TypewriterAnimation" not found.');
        return;
    }

    let sleepTime = 110;
    let currentPhraseIndex = 0;

    const writeLoop = async () => {
        while (true) {
            let currentWord = rijeci[currentPhraseIndex];

            for (let i = 0; i < currentWord.length; i++) {
                ElementId.innerText = currentWord.substring(0, i + 1);
                await sleep(sleepTime);
            }
            await sleep(sleepTime * 10);

            for (let i = currentWord.length; i > 0; i--) {
                ElementId.innerText = currentWord.substring(0, i - 1);
                await sleep(sleepTime);
            }
            await sleep(sleepTime * 5);

            if (currentPhraseIndex === rijeci.length - 1) {
                currentPhraseIndex = 0;
            } else {
                currentPhraseIndex++;
            }
        }
    };

    writeLoop();
});
