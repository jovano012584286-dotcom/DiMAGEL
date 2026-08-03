let unit = 1;
const maxUnit = parseInt(document.getElementById("stockLimit").textContent);

const unitValue = document.getElementById("unitValue");

const unitPlus = document.getElementById("unitPlus");
const unitMinus = document.getElementById("unitMinus");

function updateUnits(){

    unitValue.textContent = unit;

    unitMinus.disabled = unit === 1;
    unitPlus.disabled = unit === maxUnit;

}

unitPlus.onclick = () => {

    if(unit < maxUnit){

        unit++;

        updateUnits();

    }

};

unitMinus.onclick = () => {

    if(unit > 1){

        unit--;

        updateUnits();

    }

};

updateUnits();

// =====================
// LAMA PENYEWAAN
// =====================

let days = 1;
const maxDays = parseInt(document.getElementById("dayLimit").textContent);

const dayValue = document.getElementById("dayValue");

const dayPlus = document.getElementById("dayPlus");
const dayMinus = document.getElementById("dayMinus");

function updateDays(){

    dayValue.textContent = days + " Hari";

    dayMinus.disabled = days === 1;
    dayPlus.disabled = days === maxDays;


}

dayPlus.onclick = () => {

    if(days < maxDays){

        days++;
		
		updateDays();
		

        if(checkoutPopup.style.display === "flex"){

            refreshCalendarSelection();

        }


    }

};

dayMinus.onclick = () => {

    if(days > 1){

        days--;

        updateDays();
		
		if(checkoutPopup.style.display === "flex"){

            refreshCalendarSelection();

        }

    }

};

updateDays();

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

// ======================
// CHECKOUT POPUP
// ======================

const checkoutPopup = document.getElementById("checkoutPopup");

const openCheckout = document.getElementById("openCheckout");
const closeCheckout = document.getElementById("closeCheckout");
const cancelCheckout = document.getElementById("cancelCheckout");
const confirmCheckout = document.getElementById("confirmCheckout");

// Checkout fields
const checkoutTitle = document.getElementById("checkoutTitle");
const checkoutPrice = document.getElementById("checkoutPrice");
const checkoutUnits = document.getElementById("checkoutUnits");
const checkoutDays = document.getElementById("checkoutDays");
const checkoutTotal = document.getElementById("checkoutTotal");

// Listing fields
const listingTitle = document.getElementById("listingTitle");
const listingPrice = document.getElementById("listingPrice");

// Opens checkout
openCheckout.addEventListener("click", () => {

    // Copy title
    checkoutTitle.textContent = listingTitle.textContent;



    // Current selections
    checkoutUnits.textContent = unit + (unit === 1 ? " Unit" : " Unit");
    checkoutDays.textContent = days + (days === 1 ? " Hari" : " Hari");

    // Convert price into a number
    const priceText = listingPrice.childNodes[0].textContent.trim();

        // Copy price
    checkoutPrice.textContent = priceText + "/hari";

    const priceNumber = parseInt(
    priceText
        .replace("Rp", "")
        .replace(/\./g, "")
        .replace(",00", "")
        .trim()
);

    // Calculate total
    const total = priceNumber * unit * days;

    // Indonesian currency formatting
    checkoutTotal.textContent =
        "Rp " + total.toLocaleString("id-ID") + ",00";

    // Show popup
    renderCalendar();
    resetCalendarSelection();

    checkoutPopup.style.display = "flex";
});

// Close with X
closeCheckout.addEventListener("click", () => {

    checkoutPopup.style.display = "none";

});

// Close with Cancel
cancelCheckout.addEventListener("click", () => {

    checkoutPopup.style.display = "none";

});

// Close by clicking outside
checkoutPopup.addEventListener("click", (event) => {

    if(event.target === checkoutPopup){

        checkoutPopup.style.display = "none";

    }

});

// Open sign-up popup when user tries to submit rental
confirmCheckout.addEventListener("click", () => {

    // Close checkout popup
    checkoutPopup.style.display = "none";

    // Close account dropdown (if open)
    akunDropdown.classList.remove("show");

    // Open sign-up popup
    signupPopup.style.display = "flex";

});

// ======================
// CALENDAR ENGINE
// ======================

const calendarContainer = document.getElementById("calendarContainer");
const calendarWarning = document.getElementById("calendarWarning");

const selectedStart = document.getElementById("selectedStart");
const selectedEnd = document.getElementById("selectedEnd");

const noticeLimit =
    parseInt(document.getElementById("noticeLimit").textContent);

const now = new Date();

let currentDate = new Date(
    now.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
);

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let selectedStartDate = null;
let selectedEndDate = null;

let bookingData = {
    start: null,
    end: null
};

const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

const weekdayNames = [
    "Sen",
    "Sel",
    "Rab",
    "Kam",
    "Jum",
    "Sab",
    "Min"
];

function renderCalendar(){

	const now = new Date();

currentDate = new Date(
    now.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
);


    calendarContainer.innerHTML = "";

    const header = document.createElement("div");
    header.className = "calendar-header";

    const prevButton = document.createElement("button");
    prevButton.className = "calendar-nav";
    prevButton.textContent = "◀";

    const nextButton = document.createElement("button");
    nextButton.className = "calendar-nav";
    nextButton.textContent = "▶";

    const monthLabel = document.createElement("div");
    monthLabel.className = "calendar-month";
    monthLabel.textContent =
        monthNames[currentMonth] + " " + currentYear;

    header.appendChild(prevButton);
    header.appendChild(monthLabel);
    header.appendChild(nextButton);

    calendarContainer.appendChild(header);

    const weekdays = document.createElement("div");
    weekdays.className = "calendar-weekdays";

    weekdayNames.forEach(day => {

        const div = document.createElement("div");
        div.textContent = day;

        weekdays.appendChild(div);

    });

    calendarContainer.appendChild(weekdays);

    const daysGrid = document.createElement("div");
    daysGrid.className = "calendar-days";

    const firstDay = new Date(currentYear, currentMonth, 1);

    let startOffset = firstDay.getDay();

    startOffset = (startOffset + 6) % 7;

    const totalDays =
        new Date(currentYear, currentMonth + 1, 0).getDate();

    for(let i = 0; i < startOffset; i++){

        const empty = document.createElement("div");
        empty.className = "calendar-empty";

        daysGrid.appendChild(empty);

    }

   const earliestDate = new Date(currentDate);

    earliestDate.setHours(0,0,0,0);

    earliestDate.setDate(
        earliestDate.getDate() + noticeLimit
    );

    for(let dayNumber = 1; dayNumber <= totalDays; dayNumber++){

    const dayDiv = document.createElement("div");

    dayDiv.className = "calendar-day";

    dayDiv.textContent = dayNumber;

    const thisDate =
        new Date(currentYear,currentMonth,dayNumber);

    thisDate.setHours(0,0,0,0);

    if(thisDate < earliestDate){

        dayDiv.classList.add("calendar-disabled");

    }

    else{

        dayDiv.onclick = () => {

            selectDate(thisDate);

        };

    }

    daysGrid.appendChild(dayDiv);

}

    calendarContainer.appendChild(daysGrid);

    prevButton.onclick = () => {

        currentMonth--;

        if(currentMonth < 0){

            currentMonth = 11;
            currentYear--;

        }

        renderCalendar();

        resetCalendarSelection();

    };

    nextButton.onclick = () => {

        currentMonth++;

        if(currentMonth > 11){

            currentMonth = 0;
            currentYear++;

        }

        renderCalendar();

        resetCalendarSelection();

    };

}

// ======================
// CALENDAR SELECTION
// ======================

function clearSelection(){

    document.querySelectorAll(".calendar-day").forEach(day => {

        day.classList.remove(
            "calendar-selected",
            "calendar-start",
            "calendar-end",
            "calendar-range"
        );

    });

}

function formatDate(date){

    return date.getDate() + " " +
           monthNames[date.getMonth()] +
           " " +
           date.getFullYear();

}

function selectDate(clickedDate){

    selectedStartDate = new Date(clickedDate);

    selectedEndDate = new Date(selectedStartDate);

    selectedEndDate.setDate(
    selectedEndDate.getDate() + days - 1
);

    bookingData.start = new Date(selectedStartDate);
    bookingData.end = new Date(selectedEndDate);

    clearSelection();

    calendarWarning.textContent = "";

    selectedStart.textContent = formatDate(selectedStartDate);
    selectedEnd.textContent = formatDate(selectedEndDate);

    const dayCells =
        document.querySelectorAll(".calendar-day");

    dayCells.forEach(cell => {

        if(cell.classList.contains("calendar-disabled"))
            return;

        const number = parseInt(cell.textContent);

        if(isNaN(number))
            return;

        const cellDate =
            new Date(currentYear,currentMonth,number);

        cellDate.setHours(0,0,0,0);

        const cellTime = cellDate.getTime();

        if(cellTime < selectedStartDate.getTime())
        return;

        if(cellTime > selectedEndDate.getTime())
        return;

const diff = Math.floor(
    (cellTime - selectedStartDate.getTime()) /
    (1000 * 60 * 60 * 24)
);

        if(diff === 0){

            cell.classList.add(
                "calendar-selected",
                "calendar-start"
            );

        }

        else if(diff === days-1){

            cell.classList.add(
                "calendar-selected",
                "calendar-end"
            );

        }

        else{

            cell.classList.add(
                "calendar-range"
            );

        }

    });

}

// ======================
// CALENDAR INTEGRATION
// ======================

function refreshCalendarSelection(){

    if(selectedStartDate){

        selectDate(selectedStartDate);

    }

}

function resetCalendarSelection(){

    selectedStartDate = null;
    selectedEndDate = null;

    bookingData.start = null;
    bookingData.end = null;

    selectedStart.textContent = "-";
    selectedEnd.textContent = "-";

    calendarWarning.textContent = "";

    clearSelection();

}
