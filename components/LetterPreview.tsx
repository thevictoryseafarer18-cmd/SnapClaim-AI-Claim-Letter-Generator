"use client";
export default function LetterPreview({value,onChange}:{value:string;onChange:(s:string)=>void}){
 return(<textarea value={value} onChange={e=>onChange(e.target.value)} aria-label="Claim letter"
  className="w-full min-h-[700px] bg-white font-serif text-[15px] leading-7 p-10 md:p-16 shadow-xl rounded-sm border outline-none focus:ring-2 focus:ring-navy/30"/>);
}
