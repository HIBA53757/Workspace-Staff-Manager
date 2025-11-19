const addWorkerBtn = document.getElementById('addWorker')
const Modal = document.getElementById('Modal');
const cancelBtn = document.getElementById('cancelBtn')
let workers = []

addWorkerBtn.addEventListener('click', () => {
    Modal.style.display = 'flex'
});

cancelBtn.addEventListener('click', () => {
    Modal.style.display = "none"
});



const addExperienceBtn = document.getElementById('addExperience')
const experienceCard = document.getElementById('experienceCard')

let num = 2;

addExperienceBtn.addEventListener('click', () => {
    const newExperience = document.createElement("div")
    newExperience.innerHTML = `
        <div class="boxExperience">
            <div class="card-header">
                <label>Expérience ${num++}</label>
                <button class="delete-exp-btn"><i class="ri-delete-bin-line"></i></button>
            </div>
            <input type="text" placeholder="Company Name">
            <input type="text" placeholder="Position Held">
            <input type="text" placeholder="Duration (ex:2020-2023)">
        </div>`;
    experienceCard.appendChild(newExperience);
})

experienceCard.addEventListener('click', (e) => {
    if (e.target.closest('.delete-exp-btn')) {
        const card = e.target.closest('.boxExperience');
        if (card) card.remove();
    }
});


const sidebar = document.getElementById('sidebar')
const sideContent = document.querySelector('.side-content');

const addWorker = document.querySelector("#formAddWorker")
const nom = document.querySelector("#name")
const Role = document.querySelector('#role')
const Url = document.querySelector('#url')
const Email = document.querySelector('#email')
const Phone = document.querySelector('#phone')

addWorker.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const worker = {
        name: nom.value.trim(),
        role: Role.value.trim(),
        url: Url.value.trim(),
        email: Email.value.trim(),
        phone: Phone.value.trim(),
        zone: null
    }

    workers.push(worker);

    renderWorkers();

    
    Modal.style.display = "none";

    
    addWorker.reset();
})


function renderWorkers() {

   
    sideContent.innerHTML = "";

    if (workers.length === 0) {
        sideContent.innerHTML = `
            <i class="ri-group-line"></i><br>
            <p>No unassigned staff</p>
        `;
        return;
    }

    workers.forEach(worker => {
        const card = document.createElement("div");
        card.classList.add("worker-card");

        card.innerHTML = `
             <img src="${worker.url}" alt="Photo of ${worker.name}" class="worker-img">
            
            <div class="worker-info">
                <p class="worker-name">${worker.name}</p>
                <p class="worker-role">${worker.role}</p>
            </div>
        `

        sideContent.appendChild(card);
    });
}
