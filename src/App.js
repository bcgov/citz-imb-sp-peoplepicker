import React, { useState } from 'react'
import './App.css'
import PeoplePicker from './components/PeoplePicker'

function App() {

	const [userInfo, setUserInfo] = useState([])

	const getUserInfo = users => {
		setUserInfo(users)
	}

	return (
		<div>
			<PeoplePicker schema={{
				PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
				SearchPrincipalSource: 15,
				ResolvePrincipalSource: 15,
				AllowMultipleValues: true,
				MaximumEntitySuggestions: 50,
				Width: '400px'
			}} elementName={'myPeoplePicker'} getUserInfo={getUserInfo} />
		<ul>
			{userInfo.map((user,index)=>{
			return <li key={index}>{user.displayName} : {user.account}</li>
		})}
		</ul>
		</div>
	)
}

export default App
