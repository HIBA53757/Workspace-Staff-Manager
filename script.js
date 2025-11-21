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

formAddWorker.addEventListener("submit", function (evt) {
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
        id: Date.now(),
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
    const unassigned = workers.filter(w => w.zone === null);

    if (unassigned.length === 0) {
        sideContent.innerHTML = `<i class="ri-group-line"></i><br><p>No unassigned staff</p>`;
        return;
    }

    unassigned.forEach((worker) => {

        const index = workers.indexOf(worker);
        const card = document.createElement("div");
        card.classList.add("worker-card");
        card.innerHTML = `
            <img src="${worker.url}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png';" 
                 class="worker-img">
            <div class="worker-info">
                <p class="worker-name">${worker.name}</p>
                <p class="worker-role">${worker.role}</p>
            </div>
             <button class="delete-exp-btn" type="button"><i class="ri-delete-bin-line"></i></button>
        `;
        card.addEventListener("click", () => openWorkerInfoModal(index));


        card.querySelector(".delete-exp-btn").addEventListener("click", (e) => {
            e.stopPropagation();


            workers.splice(index, 1);


            renderWorkers();


        });
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



// Assign panel
const assignPanel = document.getElementById("assignPanel");
const assignList = document.getElementById("assignList");
const cancelAssign = document.getElementById("cancelAssign");

let selectedRoom = null;

// CLICK on assign an employee
document.querySelectorAll(".addToZone").forEach(btn => {
    btn.addEventListener("click", (e) => {

        selectedRoom = e.target.closest("div");

        showAssignPanel(e.target);
    });
});


function showAssignPanel(buttonElement) {

    const rect = buttonElement.getBoundingClientRect();
    assignPanel.style.top = rect.bottom + window.scrollY + "px";
    assignPanel.style.left = rect.left + window.scrollX + "px";

    loadUnassignedWorkers();

    assignPanel.classList.remove("hidden");
}

// Load all unassigned (zone === null)
function loadUnassignedWorkers() {
    assignList.innerHTML = "";

    const unassigned = workers.filter(w => w.zone === null);

    if (unassigned.length === 0) {
        assignList.innerHTML = `<p>No available workers</p>`;
        return;
    }

    unassigned.forEach((worker, i) => {

        const div = document.createElement("div");
        div.classList.add("assign-item");

        div.innerHTML = `
            <p>${worker.name} (${worker.role})</p>
           <button class="addBtn" data-worker-id="${worker.id}">Assign</button>
        `;

        assignList.appendChild(div);
    });
}

// Close panel
cancelAssign.addEventListener("click", () => {
    assignPanel.classList.add("hidden");
});


// Add worker to room
assignList.addEventListener("click", (e) => {
    if (e.target.matches(".addBtn")) {
        const workerId = parseInt(e.target.dataset.workerId);
        const worker = workers.find(w => w.id === workerId);

        if (!worker) return;
        const roomName = selectedRoom.querySelector("h3").innerText;
        worker.zone = roomName;

        let assignedDiv = selectedRoom.querySelector(".assigned-workers");
        if (!assignedDiv) {
            assignedDiv = document.createElement("div");
            assignedDiv.classList.add("assigned-workers");
            selectedRoom.appendChild(assignedDiv);
        }

        const span = document.createElement("span");
        span.innerText = worker.name;
        span.classList.add("room-worker");
        span.dataset.id = worker.id;
        assignedDiv.appendChild(span);


        renderWorkers();

        // Hide panel
        assignPanel.classList.add("hidden");
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("room-worker")) {
        const id = parseInt(e.target.dataset.id);
        const worker = workers.find(w => w.id === id);
        if (worker) openWorkerInfoModal(workers.indexOf(worker));
    }
});

openWorkerInfoModal(index)



