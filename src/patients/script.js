//Patient Registration and Login
const handleRegistration = async (event) => {
	event.preventDefault();
	const button = document.querySelector('#submit');
	button.disabled = true;
	button.classList.add('bg-gray-300');
	button.innerText = 'Loading';
	const errormessage = document.querySelector('#error-message');
	const form = document.querySelector('#registration-form');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/register',
			{
				method: 'POST',
				body: new FormData(form),
				credentials: 'include',
			}
		);
		const result = await response.json();
		if (response.ok) {
			window.location.href = '../patient_dashboard.html';
		} else {
			errormessage.innerHTML = result.message;
			button.disabled = false;
			button.classList.remove('bg-gray-300');
			button.innerText = 'Submit';
		}
	} catch (e) {
		errormessage.innerHTML = 'Error registering, please try again!';
		console.log('error submitting form' + e);
	}
};

const handleLogin = async (event) => {
	event.preventDefault();
	const form = document.querySelector('#login-form');
	const button = document.querySelector('#submit');
	button.disabled = true;
	button.classList.add('bg-gray-300');
	button.innerText = 'Loading';
	const errormessage = document.querySelector('#error-message');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/login',
			{
				method: 'POST',
				body: new FormData(form),
				credentials: 'include',
			}
		);
		const result = await response.json();
		if (response.ok) {
			document.cookie = `AUTH=${result.authentication.sessionToken}`;
			window.location.href = '../patient_dashboard.html';
		} else {
			errormessage.innerHTML = result.message;
			button.disabled = false;
			button.classList.remove('bg-gray-300');
			button.innerText = 'Submit';
		}
	} catch (e) {
		errormessage.innerHTML = 'Error logging in, please try again';
		console.log('Error logging in ' + e);
	}
};

const getData = async () => {
	const patientName = document.querySelector('#patientName');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/info',
			{
				method: 'GET',
				credentials: 'include',
			}
		);
		if (response.ok) {
			const result = await response.json();
			console.log(result);
			patientName.innerText = `${result.firstname} ${result.secondname} `;
		} else {
			console.log('Error getting user information');
		}
	} catch (e) {
		console.log('Error getting user details');
		console.log(e);
	}
};

const createAppointment = async (event) => {
	event.preventDefault();
	const form = document.querySelector('#appointmentForm');
	const p = document.querySelector('#message');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/createappointment',
			{
				method: 'POST',
				body: new FormData(form),
				credentials: 'include',
			}
		);
		if (response.ok) {
			const result = await response.json();
			p.innerHTML =
				'Appointment created successfully , View appointment Page .';
		} else {
			errormessage.innerHTML = result.message;
		}
	} catch (e) {
		console.log('Error creating appointment' + e);
	}
};

const displayAppointment = async () => {
	const tbody = document.querySelector('#tbody');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/appointment',
			{
				method: 'GET',
				credentials: 'include',
			}
		);
		if (response.ok) {
			const result = await response.json();
			console.log(result);
			result.map((appointment) => {
				const tr = document.createElement('tr');
				tr.innerHTML += `<td class="px-4 py-2 border">${appointment.condition}</td>`;
				tr.innerHTML += `<td class="px-4 py-2 border">${appointment.date.slice(
					0,
					10
				)}</td>`;
				tr.innerHTML += `<td class="px-4 py-2 border">${appointment.time}</td>`;
				tr.innerHTML += `<td class="px-4 py-2 border">${appointment.status}</td>`;
				tr.innerHTML += `<td class="px-4 py-2 border">${appointment?.doctor}</td>`;

				tbody.prepend(tr);
			});
		} else {
			throw new Error();
		}
	} catch (e) {
		console.log('Error Getting Appointments' + e);
	}
};
