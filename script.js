document.addEventListener('DOMContentLoaded', () => {
    const waxSeal = document.getElementById('waxSeal');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const invitationContainer = document.getElementById('invitationContainer');

    // 1. Încărcăm sunetul de răsfoit pagina din folderul local
    const pageFlipSound = new Audio('deschidere.mp3');
    pageFlipSound.volume = 0.7;

    // 2. Încărcăm melodia ambientală din folderul local
    const backgroundMusic = new Audio('fundal.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4; 

    // Control deschidere plic
    waxSeal.addEventListener('click', () => {
        // Pornim imediat sunetul de pagină răsfoită la click pe sigiliu
        pageFlipSound.play().catch(e => console.log("Eroare audio deschidere:", e));
        
        envelopeWrapper.classList.add('open');
        
        // După exact 1 secundă (1000 ms), pornim melodia de fundal pe loop
        setTimeout(() => {
            backgroundMusic.play().catch(e => console.log("Eroare audio fundal:", e));
        }, 1000);
        
        // Transformăm fundalul în rozul plicului și afișăm scrisoarea albă
        setTimeout(() => {
            document.body.classList.add('invitation-open');
            envelopeWrapper.classList.add('fade-out');
            
            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                invitationContainer.classList.remove('id-hidden');
            }, 500);
            
        }, 1100); 
    });

    // --- LOGICA DE COUNTDOWN (23 Octombrie 2026) ---
    const targetDate = new Date('October 23, 2026 00:00:00').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (difference < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-wrapper').innerHTML = "<h3>Evenimentul a avut loc!</h3>";
        }
    }, 1000);
});