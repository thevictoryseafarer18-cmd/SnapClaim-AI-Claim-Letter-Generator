import {NextResponse} from "next/server";
import {callAI} from "@/lib/ai";
import {ANALYSIS_PROMPT} from "@/lib/prompts";
export const maxDuration=60;
export async function POST(req:Request){
 try{
  const {images,insuranceType,description}=await req.json();
  if(!Array.isArray(images)||!images.length||images.length>5) return NextResponse.json({error:"Provide 1 to 5 images."},{status:400});
  const out=await callAI(ANALYSIS_PROMPT,`Insurance type: ${insuranceType}. Policyholder says: ${description}`,images.map((d:string)=>({dataUrl:d})),true);
  const analysis=JSON.parse(out.replace(/```json|```/g,"").trim());
  return NextResponse.json({analysis});
 }catch(e:any){return NextResponse.json({error:e.message||"Analysis failed"},{status:500})}
}
