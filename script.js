
const events = [
    {
        id: 1,
        name: "Tech Innovation Summit 2026",
        category: "Technology",
        date: "2026-12-15",
        venue: "KIIT Convention Centre, Bhubaneswar",
        price: "Free",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700",
        description: "Explore artificial intelligence, cloud computing, cybersecurity and the future of technology with industry experts."
    },
    {
        id: 2,
        name: "Summer Music Festival",
        category: "Music",
        date: "2026-12-20",
        venue: "Bhubaneswar City Arena",
        price: "₹499",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700",
        description: "Enjoy live performances, amazing music, talented artists and an unforgettable musical experience."
    },
    {
        id: 3,
        name: "National Sports Championship",
        category: "Sports",
        date: "2026-12-25",
        venue: "KIIT Sports Complex",
        price: "₹199",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700",
        description: "Experience thrilling sporting competitions featuring talented athletes and exciting challenges."
    },
    {
        id: 4,
        name: "Startup & Business Expo",
        category: "Business",
        date: "2027-01-05",
        venue: "Hotel Mayfair, Bhubaneswar",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700",
        description: "Connect with entrepreneurs, investors and business leaders. Discover startup opportunities and innovations."
    },
    {
        id: 5,
        name: "Web Development Workshop",
        category: "Workshop",
        date: "2027-01-10",
        venue: "KIIT Campus",
        price: "₹149",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
        description: "Learn HTML, CSS, JavaScript and modern web development techniques through practical activities."
    },
    {
        id: 6,
        name: "AI & Machine Learning Conference",
        category: "Technology",
        date: "2027-01-15",
        venue: "KIIT Auditorium",
        price: "Free",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700",
        description: "Discover machine learning, generative AI and real-world applications of artificial intelligence."
    }
];

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let selectedEvent = null;

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function displayEvents(data) {
    eventGrid.innerHTML = "";

    if (data.length === 0) {
        eventGrid.innerHTML = "<p>No events found. Try another search.</p>";
        return;
    }

    data.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.name}" loading="lazy">
            <div class="event-info">
                <span class="event-category">${event.category}</span>
                <h3>${event.name}</h3>
                <p>${event.description}</p>
                <div class="event-meta">📅 ${formatDate(event.date)}</div>
                <div class="event-meta">📍 ${event.venue}</div>
                <div class="event-meta">Ticket: ${event.price}</div>
                <button class="details-btn" data-id="${event.id}">
                    View Details →
                </button>
            </div>
        `;

        eventGrid.appendChild(card);
    });
}

function filterEvents() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = events.filter(event => {
        const matchesSearch =
            event.name.toLowerCase().includes(search) ||
            event.category.toLowerCase().includes(search) ||
            event.venue.toLowerCase().includes(search);

        const matchesCategory =
            category === "All" || event.category === category;

        return matchesSearch && matchesCategory;
    });

    displayEvents(filtered);
}

searchInput.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);

// Event details
eventGrid.addEventListener("click", function(e) {
    const button = e.target.closest(".details-btn");
    if (!button) return;

    const event = events.find(item => item.id === Number(button.dataset.id));
    if (!event) return;

    selectedEvent = event;

    document.getElementById("modalImage").src = event.image;
    document.getElementById("modalTitle").textContent = event.name;
    document.getElementById("modalCategory").textContent = event.category;
    document.getElementById("modalDescription").textContent = event.description;
    document.getElementById("modalDate").textContent = "Date: " + formatDate(event.date);
    document.getElementById("modalVenue").textContent = "Venue: " + event.venue;
    document.getElementById("modalPrice").textContent = "Ticket: " + event.price;

    document.getElementById("eventModal").style.display = "flex";
});

// Open registration
document.getElementById("registerBtn").addEventListener("click", function() {
    document.getElementById("eventModal").style.display = "none";
    document.getElementById("selectedEvent").value = selectedEvent.name;
    document.getElementById("registrationModal").style.display = "flex";
});

// Close modals
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("eventModal").style.display = "none";
});

document.getElementById("closeRegistration").addEventListener("click", () => {
    document.getElementById("registrationModal").style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target.classList.contains("modal")) {
        e.target.style.display = "none";
    }
});

// Registration validation
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const eventName = document.getElementById("selectedEvent").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (name.length < 3 || !/^[a-zA-Z\s.'-]+$/.test(name)) {
        alert("Please enter a valid name (at least 3 characters).");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Indian phone number.");
        return;
    }

    const registration = {
        name,
        email,
        phone,
        event: eventName,
        registrationDate: new Date().toISOString()
    };

    const registrations =
        JSON.parse(localStorage.getItem("eventRegistrations")) || [];

    registrations.push(registration);

    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );

    document.getElementById("successMessage").textContent =
        "Registration successful! Thank you, " + name +
        ". Your registration for " + eventName + " has been saved.";

    form.reset();
    document.getElementById("selectedEvent").value = eventName;
});

// Dark / Light mode
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    this.textContent = isLight ? "☾" : "☀";

    localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    document.getElementById("themeToggle").textContent = "☾";
}

// Mobile navigation
document.getElementById("menuBtn").addEventListener("click", function() {
    document.getElementById("navLinks").classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("active");
    });
});

// Initial display
displayEvents(events);
