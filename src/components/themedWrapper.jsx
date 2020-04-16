import React, {useState, useEffect} from "react"

export default ( props ) => {

	return (
		<div className="themed-wrapper">
			{props.children}
		</div>
	)
}