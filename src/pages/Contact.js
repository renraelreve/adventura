// Contact.js

// function Contact() {
//     return (
//       <div>
//         <h1>Contact</h1>
//         <p>Contact us through this form</p>
//       </div>
//     );
//   }
  
//   export default Contact;

import React, { useState } from 'react';

function ContactForm() {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    feedback: ''
  });

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the form data to your server or handle it as needed
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} class="contact">
      <label class="form" htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        required
      />

      <label class="form" htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />

      <label class="form" htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <label class="form" htmlFor="feedback">Feedback:</label>
      <textarea
        id="feedback"
        name="feedback"
        value={formData.feedback}
        onChange={handleInputChange}
        required
      ></textarea>

      <button class="submitButton" type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;

  