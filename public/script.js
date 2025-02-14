(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
    "Você tem certeza?",
    "Você realmente tem certeza??",
    "Mesmo?...",
    "Porfavor...",
    "Pensa um pouco!",
    "Se você disser que não...",
    "Eu vou ficar muito triste...",
    "Eu vou ficar MUITO TRISTE MESMO...",
    "Ok, eu vou parar de perguntar...",
    "Brincadeira, porfavor fala sim!❤️",
    "VOCÊ VAI SIM!",
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.35}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

document.getElementById('formData').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o recarregamento da página

    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    if (!data || !hora) {
        alert('Por favor, selecione uma data e uma hora.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, hora }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Agendamento salvo: ${data} às ${hora}. Estou ansioso para te ver! ❤️`);
            window.location.href = 'amovoce.html';
        } else {
            alert('Erro ao salvar o agendamento. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar agendamento:', error);
        alert('Erro ao enviar agendamento. Tente novamente.');
    }
});