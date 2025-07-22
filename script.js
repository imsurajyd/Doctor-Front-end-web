const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navBtn = document.querySelector('.nav-btn');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
    navBtn.classList.toggle('show');
});

// Sample doctor data (would normally come from an API)
const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        rating: 4.5,
        reviews: 124,
        distance: 2.5,
        available: true,
        image: "pic/doctor1.webp",
        alt: "Dr. Sarah Johnson, female cardiologist with shoulder-length brown hair wearing white coat",
        tags: ["Heart Specialist", "ECG", "Angioplasty"],
        insurance: ["Blue Cross", "Aetna", "UnitedHealthcare"],
        location: "Downtown Medical Center"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Dermatology",
        rating: 4.0,
        reviews: 87,
        distance: 1.2,
        available: false,
        image: "pic/doctor2.webp",
        alt: "Dr. Michael Chen, Asian dermatologist with glasses and short hair in medical attire",
        tags: ["Skin Care", "Acne Treatment", "Cosmetic"],
        insurance: ["Blue Cross", "Medicare"],
        location: "Westside Skin Clinic"
    },
    {
        id: 3,
        name: "Dr. Angela Martinez",
        specialty: "Pediatrics",
        rating: 5.0,
        reviews: 215,
        distance: 3.8,
        available: true,
        image: "pic/doctor3.webp",
        alt: "Dr. Angela Martinez, Hispanic pediatrician with curly hair smiling warmly",
        tags: ["Child Care", "Vaccination", "Nutrition"],
        insurance: ["Aetna", "UnitedHealthcare", "Medicare"],
        location: "Children's Health Center"
    },
    {
        id: 4,
        name: "Dr. Robert Wilson",
        specialty: "Neurology",
        rating: 4.2,
        reviews: 156,
        distance: 0.8,
        available: true,
        image: "pic/doctor4.webp",
        alt: "Dr. Robert Wilson, senior neurologist with gray hair and professional demeanor",
        tags: ["Brain Health", "Headache", "Alzheimer's"],
        insurance: ["Blue Cross", "Aetna", "Medicare"],
        location: "Neurological Institute"
    },
    {
        id: 4,
        name: "Dr. Robert Wilson",
        specialty: "Cardiology",
        rating: 4.2,
        reviews: 156,
        distance: 0.8,
        available: true,
        image: "pic/doctor5.webp",
        alt: "Dr. Robert Wilson, senior neurologist with gray hair and professional demeanor",
        tags: ["Brain Health", "Headache", "Alzheimer's"],
        insurance: ["Blue Cross", "Aetna", "Medicare"],
        location: "Neurological Institute"
    },
    {
        id: 5,
        name: "Dr. Lisa Wong",
        specialty: "Orthopedics",
        rating: 4.7,
        reviews: 189,
        distance: 2.1,
        available: true,
        image: "pic/doctor6.webp",
        alt: "Dr. Lisa Wong, orthopedic surgeon in scrubs with confident posture",
        tags: ["Sports Injury", "Joint Pain", "Fractures"],
        insurance: ["UnitedHealthcare", "Medicare"],
        location: "Orthopedic Center"
    },
    {
        id: 5,
        name: "Dr. Lisa Wong",
        specialty: "Orthopedics",
        rating: 4.7,
        reviews: 189,
        distance: 2.1,
        available: true,
        image: "pic/doctor2.webp",
        alt: "Dr. Lisa Wong, orthopedic surgeon in scrubs with confident posture",
        tags: ["Sports Injury", "Joint Pain", "Fractures"],
        insurance: ["UnitedHealthcare", "Medicare"],
        location: "Orthopedic Center"
    },
    {
        id: 6,
        name: "Dr. James Peterson",
        specialty: "Cardiology",
        rating: 4.8,
        reviews: 203,
        distance: 3.2,
        available: false,
        image: "pic/doctor4.webp",
        alt: "Dr. James Peterson, middle-aged cardiologist with stethoscope",
        tags: ["Heart Disease", "EKG", "Stress Test"],
        insurance: ["Blue Cross", "UnitedHealthcare"],
        location: "Heart & Vascular Center"
    },
    {
        id: 6,
        name: "Dr. James Peterson",
        specialty: "Cardiology",
        rating: 4.8,
        reviews: 203,
        distance: 3.2,
        available: false,
        image: "pic/doctor1.webp",
        alt: "Dr. James Peterson, middle-aged cardiologist with stethoscope",
        tags: ["Heart Disease", "EKG", "Stress Test"],
        insurance: ["Blue Cross", "UnitedHealthcare"],
        location: "Heart & Vascular Center"
    }
];

// Login Page
function openPage() {
    // Replace 'https://example.com' with your target URL or local page (e.g., 'page2.html')
    window.open("./login page/index.html", "_blank");
}

// DOM Elements
const searchButton = document.getElementById('searchButton');
const specialtySelect = document.getElementById('specialty');
const locationInput = document.getElementById('location');
const insuranceSelect = document.getElementById('insurance');
const sortBySelect = document.getElementById('sortBy');
const searchResults = document.getElementById('searchResults');
const appointmentModal = document.getElementById('appointmentModal');
const modalDoctorName = document.getElementById('modalDoctorName');
const modalSpecialty = document.getElementById('modalSpecialty');
const closeModal = document.getElementById('closeModal');
const cancelAppointment = document.getElementById('cancelAppointment');
const confirmAppointment = document.getElementById('confirmAppointment');

// Book Appointment functionality
function setupBookButtons() {
    document.querySelectorAll('.doctor-card button').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.doctor-card');
            const name = card.querySelector('h3').textContent;
            const specialty = card.querySelector('p').textContent;

            modalDoctorName.textContent = name;
            modalSpecialty.textContent = specialty;

            appointmentModal.classList.remove('hidden');
        });
    });
}

// Close modal
function closeModalFn() {
    appointmentModal.classList.add('hidden');
}

// Event listeners
searchButton.addEventListener('click', searchDoctors);
closeModal.addEventListener('click', closeModalFn);
cancelAppointment.addEventListener('click', closeModalFn);
confirmAppointment.addEventListener('click', function () {
    alert('Appointment booked successfully!');
    closeModalFn();
});

// Initial setup
setupBookButtons();

// Search function
function searchDoctors() {
    const specialty = specialtySelect.value;
    const location = locationInput.value.trim().toLowerCase();
    const insurance = insuranceSelect.value;
    const sortBy = sortBySelect.value;

    let filteredDoctors = doctors.filter(doctor => {
        const matchesSpecialty = !specialty || doctor.specialty === specialty;
        const matchesLocation = !location ||
            doctor.location.toLowerCase().includes(location);
        const matchesInsurance = !insurance ||
            doctor.insurance.includes(insurance);

        return matchesSpecialty && matchesLocation && matchesInsurance;
    });

    // Sort results
    if (sortBy === 'rating') {
        filteredDoctors.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
        filteredDoctors.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'availability') {
        filteredDoctors.sort((a, b) => a.available === b.available ? 0 : a.available ? -1 : 1);
    }

    // Display results
    displayResults(filteredDoctors);
}

// Display results
function displayResults(filteredDoctors) {
    searchResults.innerHTML = '';

    if (filteredDoctors.length === 0) {
        searchResults.innerHTML = '<p class="text-center text-gray-500 col-span-3 py-10">No doctors found matching your criteria. Please try different filters.</p>';
        return;
    }

    filteredDoctors.forEach(doctor => {
        const starRating = getStarRating(doctor.rating);

        const doctorCard = document.createElement('div');
        doctorCard.className = 'bg-white rounded-lg shadow-md overflow-hidden doctor-card transition-all duration-300';
        doctorCard.innerHTML = `
                    <div class="p-4 flex">
                        <div class="flex-shrink-0 mr-4">
                            <img src="${doctor.image}" alt="${doctor.alt}" class="h-24 w-24 rounded-full object-cover">
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${doctor.name}</h3>
                            <p class="text-blue-600">${doctor.specialty}</p>
                            <div class="flex items-center mt-1">
                                <div class="rating-stars">
                                    ${starRating}
                                </div>
                                <span class="text-sm text-gray-600 ml-1">(${doctor.reviews} reviews)</span>
                            </div>
                            <div class="mt-2 flex flex-wrap gap-1">
                                ${doctor.tags.map(tag =>
            `<span class="specialty-tag bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">${tag}</span>`
        ).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-3 bg-gray-50 flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-600"><i class="fas fa-map-marker-alt mr-1"></i> ${doctor.distance} miles away</p>
                            <p class="text-sm text-gray-600 mt-1"><i class="fas fa-clock mr-1"></i> ${doctor.available ? 'Available today' : 'Available tomorrow'}</p>
                        </div>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium">Book Now</button>
                    </div>
                `;

        searchResults.appendChild(doctorCard);
    });

    setupBookButtons();
}

// Helper function for star rating
function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Initial display of all doctors
displayResults(doctors);