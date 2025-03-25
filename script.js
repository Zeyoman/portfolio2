document.addEventListener('DOMContentLoaded', function() {
    animationLoadedFirst();

    document.querySelectorAll(".marquee").forEach(marquee => {
        const content = marquee.querySelector(".marquee-content");
        const clone = content.cloneNode(true);
        content.parentElement.appendChild(clone);
    });

    const textElement = document.getElementById("changeNameToPseudo");
    const originalText = textElement.textContent;
    const newText = "Zeyoman";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    var numberPage = 0;

    textElement.addEventListener("mouseenter", () => {
        hackAnimation(newText, originalText, characters, textElement);
    });

    document.querySelectorAll(".change").forEach(element => {
        element.addEventListener("click", () => {
            numberPage += 1;
            numberActualPage = numberPage - 1;
            numberNextPage = numberPage;

            actualPage = document.getElementsByTagName("body")[0].children[numberActualPage];
            nextPage = document.getElementsByTagName("body")[0].children[numberNextPage];

            actualPage.classList.add("-translate-y-full");

            nextPage.classList.add("translate-y-full")
            nextPage.classList.remove("hidden");

            setTimeout(() => {
                actualPage.classList.remove("-translate-y-full");
                actualPage.classList.add("hidden");

                nextPage.classList.add("translate-y-0");
            }, 1000);
        });
    });

    var clickNo_WhyHeSaidNo = 0;
    var scaleButtonNo = 1;
    var changeTextValue = false;
    
    document.getElementById("randomButton").addEventListener("click", function () {
        clickNo_WhyHeSaidNo += 1;

        const buttonContainer = document.getElementById("buttonContainer");
        const button = document.getElementById("randomButton");
        const titleContainerButton = document.getElementById("titleButtonProfilText");

        buttonContainer.style.position = "absolute";
        buttonContainer.style.top = "0px";
        buttonContainer.style.left = "0px";

        // Taille de la fenêtre et du bouton
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        // Générer des positions aléatoires en gardant le bouton dans l'écran
        const maxX = screenWidth - buttonWidth;
        const maxY = screenHeight - buttonHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        if (clickNo_WhyHeSaidNo >= 3){
            scaleButtonNo *=  0.9;
            buttonContainer.style.transform = `translate(${randomX}px, ${randomY}px) scale(${scaleButtonNo})`;
            if(clickNo_WhyHeSaidNo >= 10 && changeTextValue == 0){
                titleContainerButton.innerText = "Ça fait beaucoup la non ? >:|";
                changeTextValue = true;
            }
        } else {
            buttonContainer.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }
    });
});

function animationLoadedFirst(){
    const titleAnimation = document.querySelector(".shrinkTitleAppear");
    const textAnimation = document.querySelectorAll(".shrinkTextAppear");
    titleAnimation.classList.add("appear");
    textAnimation.forEach(element => {
        element.classList.add("appear"); 
    });
}

function hackAnimation(newText, originalText, characters, element){
    let iterations = 0;
    const interval = setInterval(() => {
        // valeur du truc 1
        element.textContent = newText
            .split("")
            .map((char, index) => {
                if (index < iterations) {
                    // valeur du truc 2
                    return newText[index];
                }
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }
        // vitesse du truc
        iterations += 1 / 3;
    }, 50);
}