import { useState } from "react";

function Form1() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    targetAmount: "",
    savedAmount: "",
    category: "",
    deadline: "",
    createdAt: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="id" />
        <input onChange={handleChange} type="text" name="name" />
        <input onChange={handleChange} type="text" name="targetAmount" />
        <input onChange={handleChange} type="text" name="savedAmount" />
        <input onChange={handleChange} type="text" name="category" />
        <input onChange={handleChange} type="text" name="deadline" />
        <input onChange={handleChange} type="text" name="createdAt" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form1;
