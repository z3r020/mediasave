 "use client";
import {useState} from "react";
export default function UploadBox({endpoint,formats,accept}:{endpoint:string,formats:string[],accept:string}) {
 const [file,setFile]=useState<File|null>(null),[format,setFormat]=useState(formats[0]),[busy,setBusy]=useState(false),[msg,setMsg]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();if(!file)return setMsg("Choose a file first.");setBusy(true);setMsg("");
 const fd=new FormData();fd.append("file",file);fd.append("format",format);
 try{const r=await fetch(endpoint,{method:"POST",body:fd});if(!r.ok){const j=await r.json().catch(()=>null);throw new Error(j?.error||"Processing failed.");}
 const blob=await r.blob(),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`mediasave-${Date.now()}.${format}`;a.click();URL.revokeObjectURL(url);setMsg("Done — your file is ready.");}
 catch(err){setMsg(err instanceof Error?err.message:"Something went wrong.");}finally{setBusy(false)}}
 return <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
 <label className="block rounded-2xl border border-dashed border-white/20 p-10 text-center cursor-pointer hover:border-cyan-400/50"><input className="hidden" type="file" accept={accept} onChange={e=>setFile(e.target.files?.[0]||null)}/><div className="text-4xl">⬆️</div><p className="mt-3 font-semibold">{file?file.name:"Choose a file"}</p><p className="text-sm text-slate-500 mt-1">Maximum 100 MB</p></label>
 <div className="mt-5 flex flex-col sm:flex-row gap-3"><select value={format} onChange={e=>setFormat(e.target.value)} className="bg-[#0c1220] border border-white/10 rounded-xl px-4 py-3">{formats.map(x=><option key={x}>{x}</option>)}</select><button disabled={busy} className="flex-1 rounded-xl bg-cyan-400 text-slate-950 font-bold px-5 py-3 disabled:opacity-50">{busy?"Processing…":"Convert & Download"}</button></div>
 {msg&&<p className="mt-4 text-sm text-slate-300">{msg}</p>}</form>
}