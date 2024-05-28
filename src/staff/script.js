const handleSubmit = async (e) => {
	const errormessage = document.querySelector('#error-message');
	e.preventDefault();
	const userInput = {
		matricno: e.target.staffId.value,
		password: e.target.password.value,
	};
	console.log(userInput);
	const response = await fetch('http://localhost:8080/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(userInput),
	});
	const result = await response.json();
	if (response.ok) {
		console.log('response is ok');
		window.location.href = './reception/doctors.html';
	} else {
		errormessage.innerHTML = result.message;
	}
	console.log(result);
};
