// ======================
// FILTER SYSTEM
// ======================

const checkboxes = document.querySelectorAll(".filter-checkbox");
const cards = document.querySelectorAll(".result-card");

function filterCards() {

    const selectedPeralatan = [];
    const selectedSewa = [];

    // Read every checked box
    checkboxes.forEach((checkbox) => {

        if (!checkbox.checked) return;

        if (checkbox.value.startsWith("Peralatan-")) {
            selectedPeralatan.push(checkbox.value);
        }

        if (checkbox.value.startsWith("Sewa-")) {
            selectedSewa.push(checkbox.value);
        }

    });

    // No filters = hide everything
    if (selectedPeralatan.length === 0 && selectedSewa.length === 0) {

        cards.forEach((card) => {
            card.classList.remove("show");
        });

        return;
    }

    cards.forEach((card) => {

        let peralatanMatch = true;
        let sewaMatch = true;

        // Check Peralatan
        if (selectedPeralatan.length > 0) {

            peralatanMatch = selectedPeralatan.includes(card.dataset.peralatan);

        }

        // Check Sewa
        if (selectedSewa.length > 0) {

            sewaMatch = selectedSewa.includes(card.dataset.sewa);

        }

        // Show only if BOTH categories match
        if (peralatanMatch && sewaMatch) {

            card.classList.add("show");

        } else {

            card.classList.remove("show");

        }

    });

}

// Run when any checkbox changes
checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", filterCards);

});

// Hide everything when page first loads
filterCards();

console.log("JS loaded");

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
