import React, { useState } from 'react';
import './style1.css';
import { useCreateStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation, useDeleteStudentMutation, useGetStudentsQuery } from './api';


function StudentForm() {
  const [studentData, setStudentData] = useState({ id: '', name: '', age: '', grade: '' });
  const [formErrors, setFormErrors] = useState({});

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const [createStudent, { isLoading: createLoading }] = useCreateStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  // Handle form input change
  const handleInputChange = (event) => {
    setStudentData({ ...studentData, [event.target.name]: event.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};

    if (!studentData.name.match(/^[A-Za-z]+$/)) {
      errors.name = 'Name should only contain alphabets';
    }

    if (!studentData.grade.match(/^[A-Za-z]+$/)) {
      errors.grade = 'Grade should only contain alphabets';
    }

    if (!studentData.age.match(/^[0-9]+$/)) {
      errors.age = 'Age should only contain numbers';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Add a new student
  const addStudent = async () => {
    if (validateForm()) {
      await createStudent(studentData);
      setStudentData({ id: '', name: '', age: '', grade: '' });
    }
  };

  const handleUpdate = async () => {
    if (validateForm()) {
      await updateStudent(studentData);
      setStudentData({ id: '', name: '', age: '', grade: '' });
    }
  }

  const handleDelete = async (id) => {
    await deleteStudent(id);
  }

  // Show loading state while fetching students or creating a student
  if (studentsLoading || createLoading) return 'Loading...';

  return (
    <div className="container">
      <h1 className="title">Student Hub</h1>
      <div className="form-container">
        <h2 className="subtitle">Add Student</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" value={studentData.name} onChange={handleInputChange} placeholder="Name" />
          <input type="text" name="age" value={studentData.age} onChange={handleInputChange} placeholder="Age" />
          <input type="text" name="grade" value={studentData.grade} onChange={handleInputChange} placeholder="Grade" />
          <button type="button" onClick={addStudent} className="button">
            Add Student
          </button>
          <button type="button" onClick={handleUpdate} className="button">
            Update Student
          </button>
        </form>
        {formErrors.name && <div className="error">{formErrors.name}</div>}
        {formErrors.age && <div className="error">{formErrors.age}</div>}
        {formErrors.grade && <div className="error">{formErrors.grade}</div>}
      </div>
      <div className="student-list-container">
        <h2 className="subtitle">Student List</h2>
        <table className="student-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>
                  <button onClick={() => setStudentData(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentForm;
