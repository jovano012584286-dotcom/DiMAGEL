const content = document.querySelector(".loader-content");
const fill = document.querySelector(".progress-fill");
const loader = document.getElementById("loader");
if (sessionStorage.getItem("skipLoader") === "true") {
    loader.remove();
    sessionStorage.removeItem("skipLoader");
}

// Start with a completely white screen
window.addEventListener("DOMContentLoaded", () => {

    // Wait a moment before showing logo
    setTimeout(() => {
        content.classList.add("visible");
    }, 300);
});

if (sessionStorage.getItem("skipLoader") === "true") {
    loader.remove();
    sessionStorage.removeItem("skipLoader");
} else {

    window.addEventListener("DOMContentLoaded", () => {

        setTimeout(() => {
            content.classList.add("visible");
        }, 300);

    });

    window.addEventListener("load", () => {

        let progress = 0;

        const interval = setInterval(() => {
            progress += 5;
            fill.style.width = progress + "%";

            if (progress >= 100) {
                clearInterval(interval);

                content.classList.remove("visible");

                setTimeout(() => {
                    loader.classList.add("fade-out");

                    setTimeout(() => {
                        loader.remove();
                    }, 800);

                }, 1200);
            }

        }, 180);

    });

}

const akunButton = document.getElementById("akunButton");
const akunDropdown = document.querySelector(".akun-dropdown");

akunButton.addEventListener("click", () => {
    akunDropdown.classList.toggle("show");
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".akun")) {
        akunDropdown.classList.remove("show");
    }
});

const signupPopup = document.getElementById("signupPopup");
const signupMenuButton = document.getElementById("signupMenuButton");
const closePopup = document.querySelector(".close-popup");

signupMenuButton.addEventListener("click", () => {
    signupPopup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
    signupPopup.style.display = "none";
});

signupPopup.addEventListener("click", (event) => {
    if (event.target === signupPopup) {
        signupPopup.style.display = "none";
    }
});
