import {NextResponse} from "next/server";
import {callAI} from "@/lib/ai";
import {LETTER_PROMPT} from "@/lib/prompts";
export const maxDuration=60;
export async function POST(req:Request){
 try{
  const {analysis,insuranceType,date,description}=await req.json();
  const ref=`SC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  const letter=await callAI(LETTER_PROMPT,`Claim reference: ${ref}\nInsurance type: ${insuranceType}\nDate of incident: ${date}\nPolicyholder description: ${description}\nDamage analysis JSON: ${JSON.stringify(analysis)}`);
  return NextResponse.json({letter,ref});
 }catch(e:any){return NextResponse.json({error:e.message||"Letter generation failed"},{status:500})}
}
