"use client";
export type Details={insuranceType:string;date:string;description:string};
export default function ClaimForm({v,onChange}:{v:Details;onChange:(d:Details)=>void}){
 const cls="w-full border rounded-lg px-3 py-2 bg-white";
 return(<div className="space-y-4">
  <label className="block"><span className="text-sm font-semibold">Type of insurance</span>
   <select className={cls} value={v.insuranceType} onChange={e=>onChange({...v,insuranceType:e.target.value})}>
    <option value="auto">Auto</option><option value="home">Home</option><option value="renters">Renters</option></select></label>
  <label className="block"><span className="text-sm font-semibold">Date of incident</span>
   <input type="date" className={cls} value={v.date} onChange={e=>onChange({...v,date:e.target.value})}/></label>
  <label className="block"><span className="text-sm font-semibold">What happened? (one sentence)</span>
   <input className={cls} maxLength={300} placeholder="A driver backed into my parked car in a supermarket lot." value={v.description} onChange={e=>onChange({...v,description:e.target.value})}/></label>
 </div>);
}
