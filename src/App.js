// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    emailAddress: '',
    phoneNumber: '',
    permanentAddress: '',
    currentAddress: '',
    dateOfJoining: '',
    jobTitle: '',
    department: '',
    salary: '',
    aadharNumber: '',
    PANNumber: '',
    experience: '',
  });

  const handlePhotoChange = (event) => {
    const photoFile = event.target.files[0];
    setFormData({
      ...formData,
      photo: photoFile,
    });
  };

  const handleSignChange = (event) => {
    const   signFile = event.target.files[0];
    setFormData({
      ...formData,
      photo: signFile,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFullNameChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      fullName: value,
    });
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic data validation
    if (!formData.fullName.trim() || !formData.emailAddress.trim() || !formData.phoneNumber.trim() ||
        !formData.dateOfJoining.trim() || !formData.jobTitle.trim() || !formData.department.trim() || !formData.salary.trim()) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (!validateEmail(formData.emailAddress)) {
      alert('Please enter a valid emailAddress address.');
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    if (!validateAadharNumber(formData.aadharNumber)) {
      alert('Please enter a valid Aadhar number.');
      return;
    }

    if (!validateSalary(formData.salary)) {
      alert('Please enter a valid salary amount.');
      return;
    }

    // Debug: Log form data before sending to the server
  console.log('Form Data:', formData);

    // Send the form data to the backend API
    try {
      const response = await fetch('https://kfinformtask.onrender.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Employee details successfully submitted
        alert('Employee details submitted successfully!');
        // Reset the form after successful submission
        setFormData({
          fullName: '',
          gender: '',
          emailAddress: '',
          phoneNumber: '',
          permanentAddress: '',
          currentAddress: '',
          dateOfJoining: '',
          jobTitle: '',
          department: '',
          salary: '',
          aadharNumber: '',
          PANNumber: '',
          experience: '',
        });
      } else {
        // Handle the error case
        alert('Please Enter correct details.');
      }
    } catch (error) {
      console.error('Error submitting employee details:', error);
      alert('Please Enter appropriate details.');
    }
  };

  

  // Utility functions for data validation
  const validateEmail = (emailAddress) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailAddress);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateAadharNumber = (aadharNumber) => {
    const aadharPattern = /^[0-9]{12}$/;
    return aadharPattern.test(aadharNumber);
  };
  const validateSalary = (salary) => {
    return !isNaN(parseFloat(salary)) && parseFloat(salary) >= 0 && parseFloat(salary) <= 100;
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      gender: '',
      emailAddress: '',
      phoneNumber: '',
      permanentAddress: '',
      currentAddress: '',
      dateOfJoining: '',
      jobTitle: '',
      department: '',
      salary: '',
      aadharNumber: '',
      PANNumber: '',
      experience: '',
    });

  };


  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} method='POST' style={{ backgroundColor: '#F0F4F8', padding: '70px', borderRadius: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>

            <img src="public\kfinLogo.png" alt="Company Logo"></img> 
            <h2 className="text-primary text-center mb-4">New Employee Joining Details</h2>
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleFullNameChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address <span className="text-danger">*</span> </label>
              <input type="email" className="form-control" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
            </div>

            <div className="form-group form-inline">
              <label htmlFor="gender">Gender <span className="text-danger">*</span> </label>
              <div className="d-flex justify-content-between">
                <label>
                  <input type="radio" name="gender" value="male" onChange={handleChange} required /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" onChange={handleChange} required /> Female
                </label>
                <label>
                  <input type="radio" name="gender" value="other" onChange={handleChange} required /> Other
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number <span className="text-danger">*</span> </label>
              <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneNumberChange}  />
            </div>
            <div className="form-group">
              <label>Permanent Address <span className="text-danger">*</span> </label>
              <textarea className="form-control" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Current Address </label>
              <textarea className="form-control" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Date of Joining <span className="text-danger">*</span> </label>
              <input type="date" className="form-control" placeholder="dd-mm-yyyy" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Designation <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Department <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="department" value={formData.department} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Salary (LPA) <span className="text-danger">*</span> </label>
              <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Photo Upload  </label>
              <input type="file" className="form-control-file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <div className="form-group">
              <label>Signature Upload </label>
              <input type="file" className="form-control-file" accept="image/*" onChange={handleSignChange} />
            </div>

            <div className="form-group">
              <label>Aadhar Number <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>PAN Number <span className="text-danger">*</span> </label>
              <input type="text" className="form-control" name="PANNumber" value={formData.PANNumber} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Experience (in years): </label>
              <input type="number" className="form-control" name="experience" value={formData.experience} onChange={handleChange}  />
            </div>

            <div className="text-center mb-4 d-flex justify-content-between">
              <button type="reset" className="btn btn-secondary btn-block mt-4" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={handleReset}>
                Reset
              </button>
           
              <button type="submit" className="btn btn-primary btn-block mt-4" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={handleSubmit}>
                Submit
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
