import React, { useEffect, useState } from "react";

export default function Expenses(){
  const [items,setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("securepay_expenses") || "[]");
    setItems(saved);
  },[]);

  const total = items.reduce((s,i)=>s + (i.amount||0),0);

  return (
    <div style={{maxWidth:900,margin:"0 auto"}}>
      <h2>Expenses</h2>
      <div style={{marginBottom:12}}>
        <strong>Total:</strong> ₹ {total.toFixed(2)}
      </div>
      <ul style={{listStyle:"none",padding:0}}>
        {items.length === 0 && <li>No expenses logged yet.</li>}
        {items.map((it)=>(
          <li key={it.id} style={{padding:12,borderBottom:"1px solid #eee"}}>
            <div><strong>₹ {it.amount}</strong> — {it.category}</div>
            <div style={{fontSize:12,color:"#666"}}>{new Date(it.date).toLocaleString()}</div>
            <div style={{marginTop:6,whiteSpace:"pre-wrap"}}>{it.rawSms}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
