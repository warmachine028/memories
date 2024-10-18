const updateLabel = label => {
	let flag = false
	;[].slice.call(document.querySelectorAll(".js-labels-list-item")).forEach(element => {
		if (element.querySelector(".js-label-link").textContent.trim() === label.name) {
			flag = true
			element.querySelector(".js-edit-label").click()
			element.querySelector(".js-new-label-name-input").value = label.name
			element.querySelector(".js-new-label-description-input").value = label.description ? label.description : ''
			element.querySelector(".js-new-label-color-input").value = `#${label.color}`
			element.querySelector(".js-edit-label-cancel ~ .btn-primary").click()
		}
	})
	return flag
}

const addNewLabel = label => {
	document.querySelector(".js-new-label-name-input").value = label.name
	document.querySelector(".js-new-label-description-input").value = label.description ? label.description : ''
	document.querySelector(".js-new-label-color-input").value = `#${label.color}`
	document.querySelector(".js-details-target ~ .btn-primary").disabled = false
	document.querySelector(".js-details-target ~ .btn-primary").click()
}

const addLabel = label => {
	if (!updateLabel(label)) {
		addNewLabel(label)
	}
}

// Your labels
const labels = [
	{
		name: "good first issue",
		description: "The issue is to encourage first time contributors",
		color: "7f0799"
	},
	{
        	name: 'github_actions',
        	description: 'The PR was opend by an automated github action',
        	color: '12161c'
    	},
	{
		name: "🤩 Up for the grab",
		description: "The issue is ready to be assigned to a contributor",
		color: "6C049F"
	},
	{
		name: "help wanted",
		color: "7f0799",
	},
	{
		name: "duplicate",
		color: "7f0799",
	},
	{
		name: "⛔️ status: discarded",
		color: "eeeeee",
	},
	{
		name: "✨ goal: improvement",
		color: "ffffff",
	},
	{
		name: "❓ talk: question",
		color: "f9bbe5",
	},
	{
		name: "⭐ goal: addition",
		color: "ffffff",
	},
	{
		name: "🏁 status: ready for dev",
		color: "cccccc",
	},
	{
		name: "💬 talk: discussion",
		color: "f9bbe5",
	},
	{
		name: "💻 aspect: code",
		color: "04338c",
	},
	{
		name: "📄 aspect: text",
		color: "04338c",
	},
	{
		name: "🔒 staff only",
		color: "7f0799",
	},
	{
		name: "🕹 aspect: interface",
		color: "04338c",
	},
	{
		name: "🚦 status: awaiting triage",
		color: "333333",
	},
	{
		name: "🚧 status: blocked",
		color: "999999",
	},
	{
		name: "🛠 goal: fix",
		color: "ffffff",
	},
	{
		name: "🟥 priority: critical",
		color: "b60205",
	},
	{
		name: "🟧 priority: high",
		color: "ff9f1c",
	},
	{
		name: "🟨 priority: medium",
		color: "ffcc00",
	},
	{
		name: "🟩 priority: low",
		color: "cfda2c",
	},
	{
		name: "🤖 aspect: dx",
		color: "04338c",
	},
	{
		name: "🧹 status: ticket work required",
		color: "666666",
	},
	{
		name: "🙅 status: discontinued",
		color: "cccccc",
	},
	{
		name: "🏷 status: label work required",
		color: "666666",
	},
	{
		name: "🔢 points: 1",
		color: "62A1A6",
	},
	{
		name: "🔢 points: 2",
		color: "62A1A6",
	},
	{
		name: "🔢 points: 3",
		color: "62A1A6",
	},
	{
		name: "🔢 points: 5",
		color: "62A1A6",
	},
	{
		name: "🔢 points: 8",
		color: "62A1A6",
	},
	{
		name: "🔢 points: 13",
		color: "62A1A6",
	},
	{
		name: "no-issue-activity",
		color: "ededed",
	},
	{
		name: "dependencies",
		color: "0366d6",
	},
	{
		name: "hacktoberfest",
		description: "This issue/pull request is specially marked for hacktoberfest",
		color: "eb06b0",
	},
	{
		name: "hacktoberfest-accepted",
		description: "The contribution was accepted for hactoberfest",
		color: "0f8b16",
	},
	{
		name: "feature",
		description: "This issue/PR has will be a new feature",
		color: "838b0f",
	},
]
labels.forEach(label => addLabel(label))
