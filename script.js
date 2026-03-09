const container = document.getElementById("issuesContainer")

let allIssues = []

// ISSUE COUNT UPDATE

function updateCount(issues){
const count = document.getElementById("issueCount")
count.innerText = `(${issues.length})`
}


// LOAD ISSUES

async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

}

loadIssues()


// DISPLAY ISSUES

function displayIssues(issues){

updateCount(issues)

container.innerHTML=""

issues.forEach(issue => {

const card = document.createElement("div")

card.className="bg-white border rounded shadow-sm p-4 text-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 cursor-pointer"

// BORDER COLOR

if(issue.status === "open"){
card.style.borderTop="4px solid #22c55e"
}else{
card.style.borderTop="4px solid #9333ea"
}

card.innerHTML = `

<h3 class="font-semibold text-sm mb-1">${issue.title}</h3>

<p class="text-gray-500 text-xs mb-3">
${issue.description.slice(0,70)}...
</p>

<div class="flex items-center gap-2 text-xs mb-2">

${
issue.status === "open"
? `<img src="assets/Open-Status.png" class="w-4"> <span class="text-green-600 font-medium">Open</span>`
: `<img src="assets/Closed- Status .png" class="w-4"> <span class="text-purple-600 font-medium">Closed</span>`
}

</div>

<div class="flex flex-wrap gap-2 text-xs mb-3">

<span class="bg-red-100 text-red-600 px-2 py-1 rounded">
${issue.priority}
</span>

<span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
${issue.label}
</span>

</div>

<div class="text-gray-400 text-xs">
By ${issue.author}
</div>

<div class="text-gray-400 text-xs">
${issue.createdAt}
</div>

`

card.addEventListener("click",()=>openModal(issue.id))

container.appendChild(card)

})

}



// FILTER

function showAll(btn){

setActive(btn)

displayIssues(allIssues)

}

function showOpen(btn){

setActive(btn)

const open = allIssues.filter(i=>i.status==="open")

displayIssues(open)

}

function showClosed(btn){

setActive(btn)

const closed = allIssues.filter(i=>i.status==="closed")

displayIssues(closed)

}



// ACTIVE TAB

function setActive(btn){

const tabs=document.querySelectorAll(".tabBtn")

tabs.forEach(tab=>{
tab.classList.remove("bg-purple-600","text-white")
tab.classList.add("bg-gray-200")
})

btn.classList.remove("bg-gray-200")
btn.classList.add("bg-purple-600","text-white")

}



// SEARCH

async function searchIssue(){

const text=document.getElementById("searchInput").value

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)

const data = await res.json()

displayIssues(data.data)

}



// OPEN MODAL

async function openModal(id){

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data

const modal = document.getElementById("issueModal")

modal.classList.remove("hidden")
modal.classList.add("flex")

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalStatus").innerText = issue.status
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalPriority").innerText = issue.priority
document.getElementById("modalLabel").innerText = issue.label
document.getElementById("modalDate").innerText = issue.createdAt

}



// CLOSE MODAL

function closeModal(){

const modal = document.getElementById("issueModal")

modal.classList.remove("flex")
modal.classList.add("hidden")

}         