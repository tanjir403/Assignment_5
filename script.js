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
