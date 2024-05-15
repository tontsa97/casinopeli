const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐"];
let balance = 100;

function spinReels() {
    return [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
}

function checkWin(reels) {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        return 50; // Voitto summa
    } else {
        return 0; // Ei voittoa
    }
}

function updateBalance(amount) {
    balance += amount;
    document.getElementById("balance").textContent = `Saldo: ${balance.toFixed(2)}€`;
}

document.getElementById("spinButton").addEventListener("click", () => {
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    
    if (balance < betAmount) {
        document.getElementById("result").textContent = "Saldo ei riitä panokseen.";
        return;
    }
    
    // Vähennä panos saldosta
    updateBalance(-betAmount);

    const reels = spinReels();
    
    // Animaatio
    document.querySelectorAll(".reel").forEach(reel => {
        reel.style.transform = "rotateX(360deg)";
        setTimeout(() => reel.style.transform = "rotateX(0deg)", 1000);
    });
    
    // Päivitys 1 sekunnin kuluttua
    setTimeout(() => {
        document.getElementById("reel1").textContent = reels[0];
        document.getElementById("reel2").textContent = reels[1];
        document.getElementById("reel3").textContent = reels[2];
        
        const winAmount = checkWin(reels);
        if (winAmount > 0) {
            updateBalance(betAmount * winAmount);
            document.getElementById("result").textContent = `Voitit ${betAmount * winAmount}€! 🎉`;
        } else {
            document.getElementById("result").textContent = "Hävisit, yritä uudelleen.";
        }
    }, 1000);
});
