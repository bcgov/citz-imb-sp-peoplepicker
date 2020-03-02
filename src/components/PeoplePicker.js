import React, { useEffect } from 'react'

const SP = window.SP
//const SPClientPeoplePicker_InitStandaloneControlWrapper = window.SPClientPeoplePicker_InitStandaloneControlWrapper

export default function PeoplePicker() {
	// Render and initialize the client-side People Picker.
	function initializePeoplePicker(peoplePickerElementId) {
		// Create a schema to store picker properties, and set the properties.
		var schema = {}
		schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup'
		schema['SearchPrincipalSource'] = 15
		schema['ResolvePrincipalSource'] = 15
		schema['AllowMultipleValues'] = true
		schema['MaximumEntitySuggestions'] = 50
		schema['Width'] = '280px'

		// Render and initialize the picker.
		// Pass the ID of the DOM element that contains the picker, an array of initial
		// PickerEntity objects to set the picker value, and a schema that defines
		// picker properties.
		SPClientPeoplePicker_InitStandaloneControlWrapper(
			peoplePickerElementId,
			null,
			schema
		)
	}

	// Query the picker for user information.
	function getUserInfo() {
		// Get the people picker object from the page.
		var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict
			.peoplePickerDiv_TopSpan

		// Get information about all users.
		var users = peoplePicker.GetAllUserInfo()
		var userInfo = ''
		for (var i = 0; i < users.length; i++) {
			var user = users[i]
			for (var userProperty in user) {
				userInfo += userProperty + ':  ' + user[userProperty] + '<br>'
			}
		}
		document.getElementById('resolvedUsers').innerHtml(userInfo)

		// Get user keys.
		var keys = peoplePicker.GetAllUserKeys()
		document.getElementById('userKeys').innerHtml(keys)

		// Get the first user's ID by using the login name.
		getUserId(users[0].Key)
	}

	// Get the user ID.
	function getUserId(loginName) {
		var context = new SP.ClientContext.get_current()
		this.user = context.get_web().ensureUser(loginName)
		context.load(this.user)
		context.executeQueryAsync(
			Function.createDelegate(null, ensureUserSuccess),
			Function.createDelegate(null, onFail)
		)
	}

	function ensureUserSuccess() {
		document.getElementById('userId').innerHtml(this.user.get_id())
	}

	function onFail(sender, args) {
		alert('Query failed. Error: ' + args.get_message())
	}

	useEffect(() => {

		//append libraries needed for peoplepicker
		const ppLibraries = [
			// { type: 'text/javascript', src: '/_layouts/15/sp.core.js' },
			// { type: 'text/javascript', src: '/_layouts/15/sp.runtime.js' },
			// { type: 'text/javascript', src: '/_layouts/15/sp.js' },
			// { type: 'text/javascript', src: '/_layouts/15/clienttemplates.js' },
			// { type: 'text/javascript', src: '/_layouts/15/clientforms.js' },
			// {
			// 	type: 'text/javascript',
			// 	src: '/_layouts/15/clientpeoplepicker.js'
			// },
			// { type: 'text/javascript', src: '/_layouts/15/autofill.js' }
		]

		ppLibraries.forEach(library => {
			const head = document.getElementsByName('head')[0]
			const element = document.createElement('link')
			element.type = library.type
			element.src = library.src
			head.appendChild(element)
		})

		// Specify the unique ID of the DOM element where the
		// picker will render.
		initializePeoplePicker('peoplePickerDiv')

		return () => {}
	}, [])

	return (
		<div>
			<div id='peoplePickerDiv'></div>
			<div>
				<br />
				<input
					type='button'
					value='Get User Info'
					onClick='getUserInfo()'></input>
				<br />
				<h1>User info:</h1>
				<p id='resolvedUsers'></p>
				<h1>User keys:</h1>
				<p id='userKeys'></p>
				<h1>User ID:</h1>
				<p id='userId'></p>
			</div>
		</div>
	)
}
