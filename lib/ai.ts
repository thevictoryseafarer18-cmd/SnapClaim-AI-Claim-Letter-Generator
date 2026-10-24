type Img={dataUrl:string};
const provider=()=>process.env.AI_PROVIDER==="anthropic"?"anthropic":"openai";
export async function callAI(system:string,text:string,images:Img[]=[],json=false):Promise<string>{
 if(provider()==="anthropic"){
  const content:any[]=images.map(i=>{const[m,d]=i.dataUrl.split(",");return{type:"image",source:{type:"base64",media_type:m.match(/:(.*);/)![1],data:d}}});
  content.push({type:"text",text});
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":process.env.ANTHROPIC_API_KEY||"","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-5",max_tokens:2000,system,messages:[{role:"user",content}]})});
  const d=await r.json(); if(!r.ok) throw new Error(d?.error?.message||"Anthropic error");
  return d.content.map((c:any)=>c.text||"").join("");
 }
 const content:any[]=[{type:"text",text},...images.map(i=>({type:"image_url",image_url:{url:i.dataUrl}}))];
 const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:"gpt-4o",max_tokens:2000,...(json?{response_format:{type:"json_object"}}:{}),messages:[{role:"system",content:system},{role:"user",content}]})});
 const d=await r.json(); if(!r.ok) throw new Error(d?.error?.message||"OpenAI error");
 return d.choices[0].message.content;
}
