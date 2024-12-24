document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("userForm");
	const responseMessage = document.getElementById("responseMessage");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const age = document.getElementById("age").value;

		try {
			const response = await fetch(
				"http://localhost:4000/submit-form",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, age }),
				}
			);

         console.log(response)

			const data = await response.json();

			if (response.ok) {
				responseMessage.textContent =
					"Form submitted successfully!";
				responseMessage.classList.remove("text-red-500");
				responseMessage.classList.add("text-green-500");
			} else {
				responseMessage.textContent = `Error: ${data.error}`;
				responseMessage.classList.remove("text-green-500");
				responseMessage.classList.add("text-red-500");
			}
		} catch (error) {
			responseMessage.textContent =
				"An error occurred. Please try again.";
			responseMessage.classList.remove("text-green-500");
			responseMessage.classList.add("text-red-500");
		}
	});
});
