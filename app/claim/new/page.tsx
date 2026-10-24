"use client";
import {useState} from "react";
import PhotoUploader from "@/components/PhotoUploader";
import ClaimForm,{Details} from "@/components/ClaimForm";
import LetterPreview from "@/components/LetterPreview";
const steps=["Upload","Details","Generate","Review"];
const sevColor=(n:number)=>n>=4?"bg-red-100 text-red-700":n===3?"bg-amber-100 text-amber-700":"bg-green-100 text-green-700";
export default function Wizard(){
 const [step,setStep]=useState(0);
 const [photos,setPhotos]=useState<string[]>([]);
 const [d,setD]=useState<Details>({insuranceType:"auto",date:new Date().toISOString().slice(0,10),description:""});
 const [analysis,setAnalysis]=useState<any>(null);
 const [letter,setLetter]=useState("");const [ref,setRef]=useState("");
 const [busy,setBusy]=useState(false);const [error,setError]=useState("");

 async function run(){
  setBusy(true);setError("");setStep(2);
  try{
   const a=await fetch("/api/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({images:photos,insuranceType:d.insuranceType,description:d.description})});
   const aj=await a.json();if(!a.ok)throw new Error(aj.error);
   setAnalysis(aj.analysis);
   const l=await fetch("/api/generate-letter",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({analysis:aj.analysis,...d})});
   const lj=await l.json();if(!l.ok)throw new Error(lj.error);
   setLetter(lj.letter);setRef(lj.ref);setStep(3);
  }catch(e:any){setError(e.message||"Something went wrong.")}
  finally{setBusy(false)}
 }
 async function exportPdf(){
  const [{pdf},{default:LetterPDF}]=await Promise.all([import("@react-pdf/renderer"),import("@/components/LetterPDF")]);
  const blob=await pdf(<LetterPDF text={letter}/>).toBlob();
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`claim-${ref||"letter"}.pdf`;a.click();
 }
 const btn="bg-navy text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-40";
 return(<main className="max-w-3xl mx-auto px-5 py-8">
  <a href="/" className="font-bold text-xl">SnapClaim</a>
  <ol className="flex gap-2 my-6" aria-label="Progress">{steps.map((s,i)=>(
   <li key={s} className={`flex-1 text-center text-sm py-2 rounded-lg ${i<step?"bg-ok text-white":i===step?"bg-navy text-white":"bg-white border text-slate-500"}`}>{s}</li>))}</ol>

  {step===0&&<section className="space-y-6"><PhotoUploader photos={photos} onChange={setPhotos}/>
   <button className={btn} disabled={!photos.length} onClick={()=>setStep(1)}>Continue</button></section>}

  {step===1&&<section className="space-y-6"><ClaimForm v={d} onChange={setD}/>
   <div className="flex gap-3"><button className="px-6 py-2.5 border rounded-lg bg-white" onClick={()=>setStep(0)}>Back</button>
   <button className={btn} disabled={!d.description.trim()||!d.date} onClick={run}>Generate claim letter</button></div></section>}

  {step===2&&<section>
   {error?<div className="bg-red-50 border border-red-200 p-5 rounded-lg"><p className="font-semibold text-red-700">We couldn't finish your claim letter.</p>
    <p className="text-sm text-red-700 mt-1">{error}</p><button className={`${btn} mt-4`} onClick={run}>Try again</button></div>
   :<div className="animate-pulse space-y-4" aria-busy="true"><p className="font-semibold">{analysis?"Writing your letter…":"Analyzing your photos…"} This can take up to 30 seconds.</p>
    {[...Array(6)].map((_,i)=><div key={i} className="h-4 bg-slate-300 rounded" style={{width:`${95-i*8}%`}}/>)}</div>}
  </section>}

  {step===3&&analysis&&<section className="space-y-8">
   <div className="bg-white border rounded-xl p-6">
    <div className="flex justify-between items-start"><h2 className="text-xl font-bold">Damage report</h2>
     <span className={`text-sm px-3 py-1 rounded-full font-semibold ${analysis.overallSeverity==="severe"?"bg-red-100 text-red-700":analysis.overallSeverity==="moderate"?"bg-amber-100 text-amber-700":"bg-green-100 text-green-700"}`}>{analysis.overallSeverity}</span></div>
    <p className="text-sm text-slate-600 mt-1">{analysis.damageType} · {analysis.location}</p>
    <ul className="mt-4 divide-y">{analysis.items?.map((it:any,i:number)=>(
     <li key={i} className="py-3 flex gap-3 justify-between"><div><b>{it.component}</b><p className="text-sm text-slate-600">{it.description}</p></div>
      <span className={`h-fit text-xs px-2 py-1 rounded-full font-semibold ${sevColor(it.severity)}`}>{it.severity}/5</span></li>))}</ul>
    <p className="text-sm mt-4"><b>Repair scope:</b> {analysis.repairScope}</p></div>
   <div><h2 className="text-xl font-bold mb-3">Your claim letter <span className="text-sm font-normal text-slate-500">(click to edit)</span></h2>
    <LetterPreview value={letter} onChange={setLetter}/></div>
   <div className="flex gap-3"><button className={btn} onClick={exportPdf}>Export as PDF</button>
    <button className="px-6 py-2.5 border rounded-lg bg-white" onClick={()=>{setStep(0);setPhotos([]);setAnalysis(null);setLetter("")}}>Start over</button></div>
  </section>}
 </main>);
}
