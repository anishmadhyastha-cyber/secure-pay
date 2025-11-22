import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  Simple paste UI + tiny parser that extracts the first amount it finds.
  This sends parsed result to /confirm via navigation state.
*/

const parseAmount = (text) => {
  if(!text) return null;
  // common currency markers and numbers with commas/decimals
  const re = /(?:₹|Rs\.?|INR|\bRs\b)?\s*([0-9]{1,3}(?:[0-9,]*)(?:\.[0-9]{1,2})?)/i;
  const m = text.match(re);
  if(!m) return null;
  const raw = m[1].replace(/,/g,"");
  const num = parseFloat(raw);
  return Number.isNaN(num) ? null : num;
};

export default function AddSMS(){
  const [sms,setSms] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const onParseClick = () => {
    setError("");
    const amount = parseAmount(sms);
    if(!amount){
      setError("Could not detect amount. Please type it in Confirm screen.");
    }
    // pass sms and parsed amount to Confirm page
    navigate("/confirm",{state:{sms,amount}});
  };

  return (
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <h2>Add SMS</h2>
      <p>Paste an SMS message below and click Parse — you'll be taken to the confirm screen.</p>
      <textarea
        value={sms}
        onChange={(e) => setSms(e.target.value)}
        rows={8}
        style={{width:"100%",padding:12,fontSize:14}}
        placeholder="Paste SMS here — e.g. 'Your A/C XX1234 debited by Rs.1,250.00 on 20-11-2025'"
      />
      <div style={{marginTop:12,display:"flex",gap:12}}>
        <button onClick={onParseClick}>Parse → Confirm</button>
      </div>
      {error && <p style={{color:"crimson",marginTop:12}}>{error}</p>}
    </div>
  );
}
