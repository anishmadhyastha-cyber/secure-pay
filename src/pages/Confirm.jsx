import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
  Simple confirm UI: shows parsed amount (editable), date optional,
  category select placeholder and a checkbox to confirm.
  For now this saves to localStorage as a demo (we'll switch to Firestore later).
*/

const defaultCategories = ["Food","Transport","Shopping","Bills","Other"];

export default function Confirm(){
  const loc = useLocation();
  const navigate = useNavigate();
  const payload = loc.state || {sms:"",amount:null};
  const [amount,setAmount] = useState(payload.amount ?? "");
  const [category,setCategory] = useState("Other");
  const [confirmed,setConfirmed] = useState(true);

  const onSave = () => {
    // basic validation
    const amt = parseFloat(amount);
    if(!amt || Number.isNaN(amt)){
      alert("Enter a valid amount before saving.");
      return;
    }
    const expense = {
      id: Date.now().toString(),
      amount: amt,
      category,
      date: new Date().toISOString(),
      source: "sms",
      rawSms: payload.sms ?? "",
    };
    // demo persistence: localStorage per user (replace with Firestore later)
    const prev = JSON.parse(localStorage.getItem("securepay_expenses") || "[]");
    localStorage.setItem("securepay_expenses",JSON.stringify([expense,...prev]));
    navigate("/expenses");
  };

  return (
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <h2>Confirm Expense</h2>
      <div style={{border:"1px solid #eee",padding:12,borderRadius:6}}>
        <p><strong>Raw SMS</strong></p>
        <pre style={{whiteSpace:"pre-wrap"}}>{payload.sms}</pre>
        <div style={{marginTop:12,display:"flex",gap:12,alignItems:"center"}}>
          <label>Amount</label>
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} style={{padding:8}} />
        </div>
        <div style={{marginTop:12}}>
          <label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} style={{marginLeft:8,padding:6}}>
            {defaultCategories.map((c)=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div style={{marginTop:12}}>
          <label><input type="checkbox" checked={confirmed} onChange={(e)=>setConfirmed(e.target.checked)} /> Log expense</label>
        </div>
        <div style={{marginTop:12,display:"flex",gap:12}}>
          <button onClick={onSave} disabled={!confirmed}>Save</button>
          <button onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
