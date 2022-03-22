// chrome://extensions/
let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
//get leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage
	render(myLeads) //myLeads array becomes leads in render()
}


tabBtn.addEventListener("click", function() {
		// grab url of the current tab
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){		
    	// save the url to localStorage
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)
	})
})

// function is dynamic, can take any array and render it out
function render(leads) {
let listItems = ""
for(let i =0; i < leads.length; i++) {
// template string/literal
	listItems += ` 
				<li> 
					<a target='_blank' href='${leads[i]}'> 
						${leads[i]}
					</a>
				</li>
			`
		}
	ulEl.innerHTML = listItems
}

// delete button double click: clear localStorage, myLeads, and the DOM
deleteBtn.addEventListener('dblclick', function() {
	localStorage.clear()
	myLeads = []
	render(myLeads)
})


inputBtn.addEventListener("click", function(){
	myLeads.push(inputEl.value)
	inputEl.value = ""
	// save myLeads array to localStorage
    localStorage.setItem( "myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})



/*
.......................NOTES...........................
another method to create elelment/content:
create element:   const li = document.createElement("li")
set text content: li.textContent = myLeads[i]
append to ul:     ulEl.append(li)


truthy
falsy: false, 0, "", null, undefined, NaN
null = how developers signilize emptiness
undefined = how js signilizes emptiness


myLeads = JSON.parse(myLeads) // turn into an array
myLeads.push("www.exampletwo.com") // push new value
myLeads = JSON.stringify(myLeads) // turn into string again
console.log(typeof myLeads)

parameter vs argument: "take your argument outside"
parameter = inside function
argument = outside function
*/

/*
// Create a function, getFirst(arr), that returns the first item in the array

function getFirst(arr) {
	return arr[0]
	}

// Call it with an array as an argument to verify that it works
let firstCard = getFirst([1, 10])

console.log(firstCard)
*/