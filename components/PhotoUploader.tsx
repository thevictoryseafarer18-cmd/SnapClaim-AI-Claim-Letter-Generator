"use client";
import {useRef,useState} from "react";
async function compress(file:File):Promise<string>{
 const url=URL.createObjectURL(file);
 const img=await new Promise<HTMLImageElement>((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=url});
 const s=Math.min(1,1280/Math.max(img.width,img.height));
 const c=document.createElement("canvas");c.width=img.width*s;c.height=img.height*s;
 c.getContext("2d")!.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
 return c.toDataURL("image/jpeg",0.8);
}
export default function PhotoUploader({photos,onChange}:{photos:string[];onChange:(p:string[])=>void}){
 const [over,setOver]=useState(false);const [err,setErr]=useState("");const ref=useRef<HTMLInputElement>(null);
 async function add(files:FileList|null){
  if(!files)return;setErr("");const out=[...photos];
  for(const f of Array.from(files)){
   if(out.length>=5){setErr("Maximum 5 photos.");break}
   if(!f.type.startsWith("image/")){setErr("Only image files are allowed.");continue}
   if(f.size>5*1024*1024){setErr(`${f.name} is over 5MB.`);continue}
   try{out.push(await compress(f))}catch{setErr(`Could not read ${f.name}.`)}
  }
  onChange(out);
 }
 return(<div>
  <div onClick={()=>ref.current?.click()} onDragOver={e=>{e.preventDefault();setOver(true)}} onDragLeave={()=>setOver(false)}
   onDrop={e=>{e.preventDefault();setOver(false);add(e.dataTransfer.files)}}
   className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition ${over?"border-ok bg-green-50":"border-slate-300 bg-white"}`}>
   <p className="font-semibold">Drag photos here or click to browse</p>
   <p className="text-sm text-slate-500 mt-1">Up to 5 images, 5MB each</p>
   <input ref={ref} type="file" accept="image/*" multiple hidden onChange={e=>add(e.target.files)}/>
  </div>
  {err&&<p className="text-red-600 text-sm mt-2">{err}</p>}
  <div className="grid grid-cols-5 gap-2 mt-4">{photos.map((p,i)=>(
   <div key={i} className="relative"><img src={p} alt={`Damage photo ${i+1}`} className="aspect-square object-cover rounded-lg"/>
   <button onClick={()=>onChange(photos.filter((_,j)=>j!==i))} className="absolute top-1 right-1 bg-white/90 rounded-full w-6 h-6 text-xs" aria-label="Remove photo">✕</button></div>))}</div>
 </div>);
}
