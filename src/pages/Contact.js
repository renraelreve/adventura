// Contact.js
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    feedback: ''
  });

  const [submitted, setSubmitted] = useState(false); // State to track submission status

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate submission delay (you can replace this with actual submission logic)
    setTimeout(() => {
      setSubmitted(true);
    });
  };

  return (
    <div>
      {!submitted ? (
        <form class="form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
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
          >
          </textarea>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Feedback Submitted</p>
      )}
    </div>
  );
}

export default ContactForm;



  