const stores = [
  {
    id: 10,
    name: "Blomsterlandet Umeå, Strömpilen",
    events: [3],
  },
  {
    id: 11,
    name: "Blomsterlandet Umeå, Grubbe",
    events: [1, 2, 3],
  },
];

// Event data
const events = [
  {
    id: 1,
    name: "Kransbindarkväll",
    description:
      "Att göra en egen hårkrans från grunden som ett proffs är verkligen ett hantverk. Nu har du chansen att lära dig av vår florist Deborah som är en van kursledare och en eminent florist. Under kursen handleder hon gruppen och du får lära dig grunden för att binda en vacker hårkrans av säsongens blommor. Kransen får du självklart ta med dig hem efter kursens slut.",
    category: "Workshop",
    cost: "300 SEK",
    date: "2022-05-01",
    startTime: "10:00",
    endTime: "12:00",
    seats: 50,
    img: "https://th.bing.com/th/id/R.9b156042efb737de73c3c6ea90746f6f?rik=ZgAC9yuTMtzxbA&riu=http%3a%2f%2fresources.mynewsdesk.com%2fimage%2fupload%2ft_open_graph_image%2fbas28hrhu9zrgiuuemur.jpg&ehk=uWS7jM4PULl67SYJYxttbODc3ZspHZjCwGFzbzn5g80%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Grön AW",
    description:
      "Ad eu consequat consequat occaecat qui consectetur voluptate officia aliqua mollit veniam officia tempor. Nisi consectetur esse aliquip occaecat. Eiusmod excepteur proident excepteur ipsum labore ea qui aute excepteur pariatur Lorem. Sit exercitation do consectetur ullamco nostrud eiusmod reprehenderit dolore ullamco proident. Aliqua eu labore mollit reprehenderit anim est amet ex dolor amet magna irure. Ut fugiat adipisicing pariatur voluptate aliquip ad cupidatat.",
    date: "2022-06-01",
    category: "Workshop",
    cost: "Kostnadsfritt",
    startTime: "10:00",
    endTime: "12:00",
    seats: 30,
    img: "https://th.bing.com/th/id/R.87dcc98e383058b9f67bbee1308b4025?rik=MytV%2bewmFoEvNg&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    name: "Föreläsning med Linda Schilén",
    description:
      "In anim ullamco mollit ut labore sunt. Minim esse reprehenderit dolore consequat et amet mollit veniam. Velit aute sit ea mollit nulla fugiat. Esse ut do consectetur pariatur dolor dolor.",
    category: "Föreläsning",
    cost: "150 SEK",
    date: "2022-07-01",
    startTime: "10:00",
    endTime: "12:00",
    seats: 20,
    img: "https://static.cdn-expressen.se/images/58/a2/58a2ca9ff3fd4030ab3d68ac9b689b9e/16x9/2560.jpg",
  },
];

// Get elements
const searchStoreSelect = document.getElementById("search");
const storeSelect = document.getElementById("store-select");
const eventGrid = document.getElementById("event-grid");
const bookModal = document.getElementById("book-modal");
const bookModalClose = document.getElementById("book-modal-close");
const bookForm = document.getElementById("book-form");
const bookFormButton = document.getElementById("book-form-button");
const eventIdInput = document.getElementById("event-id");
const eventNameInput = document.getElementById("event-name");
const storeNameInput = document.getElementById("store-name");

let selectedStore = "";

// Populate store select
stores.forEach((store) => {
  const option = document.createElement("option");
  option.value = store.id;
  option.textContent = store.name;
  storeSelect.appendChild(option);
});

// Populate event grid
function populateEventGrid(events) {
  eventGrid.innerHTML = "";
  events.forEach((event) => {
    const eventBox = document.createElement("div");
    eventBox.classList.add("event-box");

    // Image
    const eventImg = document.createElement("div");
    eventImg.classList.add("event-img");
    eventImg.innerHTML = `
        <img src="${event.img}">
        `;

    // Details
    const eventDetails = document.createElement("div");
    eventDetails.classList.add("event-details");

    const eventName = document.createElement("h1");
    eventName.classList.add("event-name");
    eventName.textContent = event.name;

    const eventCategory = document.createElement("h3");
    eventCategory.classList.add("event-category");
    eventCategory.textContent = `${event.category}`;
    if (event.category === "Föreläsning") {
      eventCategory.classList.add("red");
    } else if (event.category === "Workshop") {
      eventCategory.classList.add("blue");
    }

    const eventDescription = document.createElement("p");
    eventDescription.classList.add("event-description");
    eventDescription.textContent = `${event.description}`;

    // Bullets
    const eventBullets = document.createElement("div");
    eventBullets.classList.add("event-bullets");

    const eventDate = document.createElement("p");
    eventDate.classList.add("event-date");
    eventDate.innerHTML = `<i class="fa-solid fa-calendar">${event.date}</i>`;

    const eventTime = document.createElement("p");
    eventTime.classList.add("event-time");
    eventTime.innerHTML = `<i class="fa-solid fa-clock">${event.startTime}-${event.endTime}</i>`;

    const eventSeats = document.createElement("p");
    eventSeats.classList.add("event-seats");
    eventSeats.textContent = `Seats available: ${event.seats}`;

    const bookButton = document.createElement("button");
    bookButton.classList.add("book-button");
    bookButton.textContent = "Book";
    bookButton.addEventListener("click", () => {
      openBookModal(event);
    });

    eventDetails.appendChild(eventName);
    eventDetails.appendChild(eventCategory);

    eventDetails.appendChild(eventBullets);
    eventDetails.appendChild(eventDescription);

    eventBullets.appendChild(eventDate);
    eventBullets.appendChild(eventTime);

    eventGrid.appendChild(eventBox);
    eventBox.appendChild(eventImg);
    eventBox.appendChild(eventDetails);
    eventDetails.appendChild(bookButton);
  });
}

// // Filter events based on selected store
// function filterEvents(storeId) {
//   const eventIds = stores.find((store) => store.id == storeId).events;
//   const filteredEvents = events.filter((event) => eventIds.includes(event.id));
//   return filteredEvents;
// }

// // Update event grid when store is selected
// storeSelect.addEventListener("change", () => {
//   const storeId = storeSelect.value;
//   const filteredEvents = filterEvents(storeId);
//   populateEventGrid(filteredEvents);
//   selectedStore = storeSelect.options[storeSelect.selectedIndex].text;
// });

// Open book modal
function openBookModal(event) {
  eventIdInput.value = event.id;
  eventNameInput.value = event.name;
  storeNameInput.value = selectedStore;
  bookModal.style.display = "block";

  const selectedEvent = document.querySelector("#selected-event");
  selectedEvent.innerHTML = "";

  const eventImg = document.createElement("div");
  eventImg.classList.add("event-img");
  eventImg.innerHTML = `
        <img src="${event.img}">
        `;

  const eventName = document.createElement("h1");
  eventName.classList.add("event-name");
  eventName.textContent = `${event.name} hos ${selectedStore}`;

  const eventDescription = document.createElement("p");
  eventDescription.classList.add("selected-event-description");
  eventDescription.textContent = `${event.description}`;

  const eventBullets = document.createElement("div");
  eventBullets.classList.add("selected-event-bullets");

  const eventDate = document.createElement("h2");
  eventDate.classList.add("selected-event-date");
  eventDate.innerHTML = `När: ${event.date} kl ${event.startTime} - ${event.endTime}`;

  const eventLocation = document.createElement("h2");
  eventLocation.classList.add("selected-event-location");
  eventLocation.innerHTML = `Var: ${selectedStore}`;

  const eventPrice = document.createElement("h2");
  eventPrice.classList.add("selected-event-location");
  eventPrice.innerHTML = `Kostnad: ${event.cost}`;

  // const eventLocation = document.createElement("p")

  selectedEvent.appendChild(eventImg);
  selectedEvent.appendChild(eventName);
  selectedEvent.appendChild(eventDescription);
  selectedEvent.appendChild(eventBullets);

  eventBullets.appendChild(eventDate);
  eventBullets.appendChild(eventLocation);
  eventBullets.appendChild(eventPrice);
}

const bookName = document.getElementById("name");
const bookEmail = document.getElementById("email");
const bookTelephone = document.getElementById("telephone");
const bookSeats = document.getElementById("seats");

bookModalClose.addEventListener("click", () => {
  bookModal.style.display = "none";
});

let eventName = "";

bookFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(`
    Tack för din bokning ${bookName.value.split(" ").slice(0, 1)}! \n\n

    Namn: ${bookName.value}\n
    E-postadress: ${bookEmail.value}\n
    Telefonnummer: ${bookTelephone.value}\n
    Antal platser: ${bookSeats.value}
    `);
});

// Search bar

// Attach event listener to search bar
document.getElementById("search").addEventListener("keyup", searchStores);

// Filter events based on selected store
function filterEvents(storeId) {
  const eventIds = stores.find((store) => store.id == storeId).events;
  const filteredEvents = events.filter((event) => eventIds.includes(event.id));
  return filteredEvents;
}

// Update event grid when store is selected
storeSelect.addEventListener("change", () => {
  const storeId = storeSelect.value;
  const filteredEvents = filterEvents(storeId);
  populateEventGrid(filteredEvents);
  selectedStore = storeSelect.options[storeSelect.selectedIndex].text;
});

console.log(document.getElementById("search").value);

function searchStores() {
  // Get input value
  const searchTerm = document.getElementById("search").value.toLowerCase();

  // Filter stores based on name
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm)
  );

  // Update store dropdown
  const storeSelect = document.getElementById("store-select");
  storeSelect.innerHTML = "";
  filteredStores.forEach((store) => {
    const option = document.createElement("option");
    option.value = store.id;
    option.textContent = store.name;
    storeSelect.appendChild(option);
  });

  // Clear event grid when search bar is empty
  const eventGrid = document.getElementById("event-grid");
  if (searchTerm === "") {
    eventGrid.innerHTML = "";
    return;
  }

  // Update event grid when store is selected
  storeSelect.addEventListener("change", () => {
    const storeId = storeSelect.value;
    const filteredEvents = filterEvents(storeId);
    populateEventGrid(filteredEvents);
    selectedStore = storeSelect.options[storeSelect.selectedIndex].text;
  });

  // Show events for all matching stores
  if (filteredStores.length > 1) {
    const allEvents = [];
    filteredStores.forEach((store) => {
      const eventIds = store.events;
      const filteredEvents = events.filter((event) =>
        eventIds.includes(event.id)
      );
      allEvents.push(...filteredEvents);
    });
    populateEventGrid(allEvents);
    return;
  }

  // Select first matching store by default
  if (filteredStores.length > 0) {
    storeSelect.selectedIndex = 0;
    storeSelect.dispatchEvent(new Event("change"));
  } else {
    // Clear event grid if no stores match the search term
    eventGrid.innerHTML = "";
    storeSelect.innerHTML = "";
  }
}
