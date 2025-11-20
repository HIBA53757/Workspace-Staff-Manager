const addWorkerBtn = document.getElementById('addWorker');
const Modal = document.getElementById('Modal');
const cancelBtn = document.getElementById('cancelBtn');
let workers = [];
let experience = 0;

// Open/close modal
addWorkerBtn.addEventListener('click', () => Modal.style.display = 'flex');
cancelBtn.addEventListener('click', () => Modal.style.display = 'none');

// Experience section
const addExperienceBtn = document.getElementById('addExperience');
const experienceCard = document.getElementById('experienceCard');

addExperienceBtn.addEventListener('click', () => {
    experience++;
    const newExperience = document.createElement("div");
    newExperience.classList.add("boxExperience");
    newExperience.innerHTML = `
        <div class="card-header">
            <label>Experience ${experience}</label>
            <button class="delete-exp-btn" type="button"><i class="ri-delete-bin-line"></i></button>
        </div>
        <input id="company${experience}" type="text" placeholder="Company Name">
        <input id="role${experience}" type="text" placeholder="Position Held">
        <input id="from${experience}" type="date">
        <input id="to${experience}" type="date">
    `;
    experienceCard.appendChild(newExperience);
});

// Delete experience
experienceCard.addEventListener('click', e => {
    if (e.target.closest('.delete-exp-btn')) {
        const card = e.target.closest('.boxExperience');
        if (card) card.remove();
    }
});

// Register worker
const formAddWorker = document.getElementById("formAddWorker");
const nom = document.getElementById("name");
const Role = document.getElementById("role");
const Url = document.getElementById("url");
const Email = document.getElementById("email");
const Phone = document.getElementById("phone");

formAddWorker.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const exps = [];
    for (let i = 1; i <= experience; i++) {
        const companyValue = document.getElementById(`company${i}`)?.value || "";
        const roleValue = document.getElementById(`role${i}`)?.value || "";
        const fromValue = document.getElementById(`from${i}`)?.value || "";
        const toValue = document.getElementById(`to${i}`)?.value || "";

        if (companyValue.trim() !== "" || roleValue.trim() !== "") {
            exps.push({ company: companyValue, role: roleValue, from: fromValue, to: toValue });
        }
    }

    const worker = {
        name: nom.value.trim(),
        role: Role.value.trim(),
        url: Url.value.trim(),
        email: Email.value.trim(),
        phone: Phone.value.trim(),
        experiences: exps,
        zone: null
    };

    workers.push(worker);
    renderWorkers();
    Modal.style.display = "none";
    formAddWorker.reset();
});

// Render workers in sidebar
const sideContent = document.querySelector('.side-content');

function renderWorkers() {
    sideContent.innerHTML = "";
    if (workers.length === 0) {
        sideContent.innerHTML = `<i class="ri-group-line"></i><br><p>No unassigned staff</p>`;
        return;
    }

    workers.forEach((worker, index) => {
        const card = document.createElement("div");
        card.classList.add("worker-card");
        card.innerHTML = `
            <img src="${worker.url}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png';" 
                 class="worker-img">
            <div class="worker-info">
                <p class="worker-name">${worker.name}</p>
                <p class="worker-role">${worker.role}</p>
            </div>
        `;
        card.addEventListener("click", () => openWorkerInfoModal(index));
        sideContent.appendChild(card);
    });
}

// Worker info modal
const workerInfoModal = document.getElementById("detailsModal");
const workerInfoBody = document.getElementById("detailsBody");
const closeWorkerInfoBtn = document.getElementById("closeDetailsBtn");

function openWorkerInfoModal(index) {
    const worker = workers[index];
    workerInfoBody.innerHTML = `
        <div class="worker-details-view">
            <img src="${worker.url}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png';" class="worker-img">
            <p><strong>Name:</strong> ${worker.name}</p>
            <p><strong>Role:</strong> ${worker.role}</p>
            <p><strong>Email:</strong> ${worker.email}</p>
            <p><strong>Phone:</strong> ${worker.phone}</p>
            <h4>Experiences:</h4>
            <ul>
                ${worker.experiences.map(exp => `<li>${exp.company} - ${exp.role} (${exp.from} → ${exp.to})</li>`).join('')}
            </ul>
        </div>
    `;
    workerInfoModal.style.display = "flex";
}

closeWorkerInfoBtn.addEventListener("click", () => workerInfoModal.style.display = "none");


