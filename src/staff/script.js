//Submit Button Of Staff Login Page
const handleSubmit = async (e) => {
	e.preventDefault();
	const button = document.querySelector('#submit');
	button.disabled = true;
	button.classList.add('bg-gray-300');
	button.innerText = 'Loading';
	const errormessage = document.querySelector('#error-message');
	const userInput = {
		matricno: e.target.staffId.value,
		password: e.target.password.value,
	};
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/staff/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(userInput),
			}
		);

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
			button.disabled = false;
			button.classList.remove('bg-gray-300');
			button.innerText = 'Submit';
		}
	} catch (e) {
		errormessage.innerHTML = 'Error logging you in, please try again.';
		console.log(`Error trying to log in ${e}`);
	}
};
//End of Submit Button Function
