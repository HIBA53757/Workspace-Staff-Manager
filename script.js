
const addWorkerBtn = document.getElementById('addWorker')
const Modal = document.getElementById('Modal');
const cancelBtn =document.getElementById('cancelBtn')

addWorkerBtn.addEventListener('click',()=>{
    Modal.style.display ='flex'
});
cancelBtn.addEventListener('click',()=>{
 Modal.style.display ="none"
});

const addExperienceBtn = document.getElementById('addExperience')
const experienceCard = document.getElementById('experienceCard')


addExperienceBtn.addEventListener('click',()=>{
    const newExperience =document.createElement("div")
    newExperience.innerHTML = "<p>test</p>"
    experienceCard .appendChild(newExperience);
})