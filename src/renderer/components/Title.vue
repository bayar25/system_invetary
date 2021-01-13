<template>
	<div id="Title">
		<h1><slot></slot></h1>
	</div>
</template>
<style scoped>
#Title {
	width: 100%;
	background-color: rgb(32, 32, 32);
	color: #1867c0;
	display: grid;
	grid-template-columns: 1fr auto;
}
#Title > h1 {
	display:inline-block; 
	padding: 5px 10px;
	background-color: white;
	margin: 0;
	width: fit-content;
	font-size: 1.5em;
}
.closed {
	display: flex;
	color: white;
	align-items: center;
	text-align: center;
	padding: 0 40px;
}
.closed > a {
	color: white;
}
.closed > a:hover {
	color: #b71c1c;
}
</style>
