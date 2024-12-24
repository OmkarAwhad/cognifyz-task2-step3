const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit-form", (req, res) => {
	const { name, email, age } = req.body;

	if (!name || typeof name !== "string" || name.trim() === "") {
		console.log(
			"Validation Error: Name is required and must be a non-empty string."
		);
		return res.status(400).json({
			error: "Name is required and must be a non-empty string.",
		});
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !emailRegex.test(email)) {
		console.log("Validation Error: A valid email is required.");
		return res.status(400).json({ error: "A valid email is required." });
	}

	if (!age || isNaN(age) || age <= 0) {
		console.log(
			"Validation Error: Age is required and must be a positive number."
		);
		return res.status(400).json({
			error: "Age is required and must be a positive number.",
		});
	}

	console.log("Form data is valid!");
	res.status(200).json({ message: "Form data is valid!" });
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
