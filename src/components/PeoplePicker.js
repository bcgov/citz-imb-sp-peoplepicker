import React, { useEffect } from 'react'

//const SP = window.SP
const dev = window.dev

const ppLibraries = [
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clienttemplates.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clientforms.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/clientpeoplepicker.js'
	},
	{
		type: 'text/javascript',
		src: 'http://localhost:8081/_layouts/15/autofill.js'
	}
]

export default function PeoplePicker({ schema, elementName, getUserInfo }) {
	let loadDelay = 0
	if (dev) loadDelay = 1000

	// Query the picker for user information.
	// function getUserInfo() {
	// 	// Get the people picker object from the page.
	// 	var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict
	// 		.peoplePickerDiv_TopSpan

	// 	// Get information about all users.
	// 	var users = peoplePicker.GetAllUserInfo()
	// 	var userInfo = ''
	// 	for (var i = 0; i < users.length; i++) {
	// 		var user = users[i]
	// 		for (var userProperty in user) {
	// 			userInfo += userProperty + ':  ' + user[userProperty] + '<br>'
	// 		}
	// 	}
	// 	document.getElementById('resolvedUsers').innerHtml(userInfo)

	// 	// Get user keys.
	// 	var keys = peoplePicker.GetAllUserKeys()
	// 	document.getElementById('userKeys').innerHtml(keys)

	// 	// Get the first user's ID by using the login name.
	// 	getUserId(users[0].Key)
	// }

	// Get the user ID.
	// function getUserId(loginName) {
	// 	var context = new SP.ClientContext.get_current()
	// 	this.user = context.get_web().ensureUser(loginName)
	// 	context.load(this.user)
	// 	context.executeQueryAsync(
	// 		Function.createDelegate(null, ensureUserSuccess),
	// 		Function.createDelegate(null, onFail)
	// 	)
	// }

	// function ensureUserSuccess() {
	// 	document.getElementById('userId').innerHtml(this.user.get_id())
	// }

	// function onFail(sender, args) {
	// 	alert('Query failed. Error: ' + args.get_message())
	// }

	useEffect(() => {
		//append libraries needed for peoplepicker
		ppLibraries.forEach(library => {
			const head = document.getElementsByTagName('head')[0]
			const element = document.createElement('script')
			element.type = library.type
			element.src = library.src
			head.appendChild(element)
		})

		const observer = new MutationObserver(mutations => {
			let userArray = []

			for (let i = 0; i < mutations[0].addedNodes.length; i++) {
				userArray.push({
					displayName: mutations[0].addedNodes[i].childNodes[1].title,
					account: mutations[0].addedNodes[i].attributes.sid.value
				})
			}
			getUserInfo(userArray)
		})

		// Render and initialize the picker.
		// Pass the ID of the DOM element that contains the picker, an array of initial
		// PickerEntity objects to set the picker value, and a schema that defines
		// picker properties.
		setTimeout(function() {
			// eslint-disable-next-line
			SPClientPeoplePicker_InitStandaloneControlWrapper(
				elementName,
				null,
				schema
			)
			let el = document.querySelector(
				`#${elementName}_TopSpan_ResolvedList`
			)
			observer.observe(el, { childList: true })
		}, loadDelay)

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<div>
			<div id={elementName}></div>
		</div>
	)
}
