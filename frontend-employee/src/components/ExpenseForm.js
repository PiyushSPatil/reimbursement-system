import { useState } from "react";
import API from "../services/api";
import "../styles/main.css";

export default function ExpenseForm() {
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
    paidBy: "",
    remarks: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (file) formData.append("file", file);

    try {
      await API.post("/expenses", formData);
      alert("Submitted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Add Expense</h2>

        <form onSubmit={handleSubmit}>
          <input className="input" name="description" placeholder="Description" onChange={handleChange} />
          <input className="input" name="category" placeholder="Category" onChange={handleChange} />
          <input className="input" name="amount" type="number" placeholder="Amount" onChange={handleChange} />
          <input className="input" name="date" type="date" onChange={handleChange} />
          <input className="input" name="paidBy" placeholder="Paid By" onChange={handleChange} />
          <input className="input" name="remarks" placeholder="Remarks" onChange={handleChange} />

          <input className="file" type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}