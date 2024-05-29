//Submit Button Of Staff Login Page
const handleSubmit = async (e) => {
	const errormessage = document.querySelector('#error-message');
	e.preventDefault();
	const userInput = {
		matricno: e.target.staffId.value,
		password: e.target.password.value,
	};
	try {
		const response = await fetch('http://localhost:8080/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(userInput),
		});

		if (response.ok) {
			const result = await response.json();
			let location;
			switch (result.role) {
				case 'doctor':
					location = './doctors/doctor_dashboard.html';
					break;
				case 'nurse':
					location = './nurse/nurse_dashboard.html';
					break;
				case 'reception':
					location = './reception/receptionist_dashboard.html';
					break;
			}
			window.location.href = location;
		} else {
			errormessage.innerHTML = 'Error logging you in, please try again.';
		}
	} catch (e) {
		console.log(`Error trying to log in ${e}`);
	}
};
//End of Submit Button Function
