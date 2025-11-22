import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddSMS from "./pages/AddSMS";
import Confirm from "./pages/Confirm";
import Expenses from "./pages/Expenses";

const Nav = () => (
  <nav style={{padding: "12px",borderBottom: "1px solid #eee",display: "flex",gap: "12px"}}>
    <Link to="/add">Add SMS</Link>
    <Link to="/expenses">Expenses</Link>
  </nav>
);

export default function App(){
  return (
    <BrowserRouter>
      <Nav />
      <main style={{padding: "18px"}}>
        <Routes>
          <Route path="/" element={<AddSMS />} />
          <Route path="/add" element={<AddSMS />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
