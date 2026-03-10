import React, { memo } from 'react'

const User = () => {
	return (
		<div className="page user container">
			<h1>Usuário</h1>
			<p>Área do usuário — perfil, configurações e histórico.</p>
		</div>
	)
}

export default memo(User)

