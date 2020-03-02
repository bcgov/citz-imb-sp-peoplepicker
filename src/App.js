import React from 'react'
import './App.css'
import ReactDependentScript from 'react-dependent-script'
import PeoplePicker from './components/PeoplePicker'

function App() {
	return (
		<ReactDependentScript
			scripts={[
				'http://localhost:8081/_layouts/15/1033/strings.js',
				'http://localhost:8081/_layouts/15/clienttemplates.js',
        'http://localhost:8081/_layouts/15/clientforms.js',
        'http://localhost:8081/_layouts/15/clientpeoplepicker.js',
        'http://localhost:8081/_layouts/15/autofill.js'
			]}>
			<PeoplePicker />
		</ReactDependentScript>
	)
}

export default App
