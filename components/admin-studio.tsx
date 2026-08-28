"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award, Check, ChevronDown, ChevronUp, Download, ExternalLink, FileText,
  ImagePlus, LayoutDashboard, Menu, Plus, RotateCcw, Save, Settings,
  Sparkles, Trash2, Upload, UserRound, X,
} from "lucide-react";
import { cloneDefaults, defaults, readPortfolio, STORAGE_KEY, type PortfolioData } from "@/lib/portfolio";

const navigation = [
  ["Overview", "overview", LayoutDashboard], ["Profile", "profile", UserRound],
  ["Content", "content", FileText], ["Credentials", "credentials", Award],
  ["Data & backup", "settings", Settings],
] as const;

export default function AdminStudio() {
  const [data, setData] = useState<PortfolioData>(defaults);
  const [saved, setSaved] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(readPortfolio());
  }, []);

  const update = (recipe: (draft: PortfolioData) => void) => {
    setData(current => { const draft = structuredClone(current); recipe(draft); return draft; });
    setSaved(false);
  };
  const notify = (message: string) => {
    setToast(message); if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(""), 2600);
  };
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); setSaved(true); notify("Portfolio saved successfully"); }
    catch { notify("Browser storage is full — use smaller images."); }
  };
  const move = <T,>(list: T[], index: number, direction: number) => {
    const next = index + direction; if (next < 0 || next >= list.length) return;
    [list[index], list[next]] = [list[next], list[index]];
  };
  const uploadedImages = data.gallery.length + data.credentials.filter(x => x.image).length + (data.hero.photo ? 1 : 0);

  async function handleImage(file: File | undefined, callback: (image: string) => void) {
    if (!file) return;
    try { callback(await compressImage(file)); } catch (error) { notify(error instanceof Error ? error.message : "Could not process image"); }
  }

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${sidebar ? "open" : ""}`}>
      <Link href="/admin" className="flex items-center gap-3 px-2 pb-9 text-white"><span className="grid size-11 place-items-center rounded-[14px] bg-white font-display text-sm font-semibold text-ink">SM</span><div><strong className="block font-display text-lg leading-tight">Portfolio Studio</strong><small className="text-[10px] text-white/45">Content manager</small></div></Link>
      <nav className="space-y-1" aria-label="Admin sections">{navigation.map(([label,id,Icon],i)=><a key={id} href={`#${id}`} onClick={()=>setSidebar(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold transition ${i===0?"bg-white/10 text-white":"text-white/55 hover:bg-white/[.07] hover:text-white"}`}><Icon size={16}/>{label}</a>)}</nav>
      <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-2 pt-5"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-50"/><span className="relative inline-flex size-2 rounded-full bg-sage"/></span><div><strong className="block text-[10px]">Local editing mode</strong><small className="text-[9px] text-white/40">Data stays in this browser</small></div></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar">
        <div className="flex items-center gap-3"><button onClick={()=>setSidebar(!sidebar)} className="grid size-10 place-items-center rounded-xl border border-ink/10 bg-white lg:hidden" aria-label="Toggle sidebar">{sidebar?<X size={19}/>:<Menu size={19}/>}</button><div><span className="text-[9px] font-bold uppercase tracking-[.18em] text-rose">Portfolio admin</span><h1 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">Creative control centre.</h1></div></div>
        <div className="flex items-center gap-2 sm:gap-4"><span className={`hidden items-center gap-1.5 text-[10px] font-semibold sm:flex ${saved?"text-sage":"text-rose"}`}>{saved?<Check size={13}/>:<Sparkles size={13}/>} {saved?"All changes saved":"Unsaved changes"}</span><Link href="/" target="_blank" className="admin-button">Live site <ExternalLink size={13}/></Link><button onClick={save} className="admin-button primary"><Save size={13}/><span className="hidden sm:inline">Save changes</span></button></div>
      </header>

      <AdminSection id="overview" eyebrow="Overview" title="Your portfolio at a glance">
        <div className="grid gap-4 md:grid-cols-3">{[["10+","Years of experience","Professional career"],[String(data.credentials.length),"Credentials","Visible recognition cards"],[String(uploadedImages),"Uploaded images","Profile & certificate media"]].map(([value,label,detail])=><article key={label} className="admin-panel flex items-center gap-5"><strong className="font-display text-4xl font-semibold text-ink">{value}</strong><div><span className="block text-xs font-bold">{label}</span><small className="text-[10px] text-muted">{detail}</small></div></article>)}</div>
        <div className="mt-4 flex items-start gap-4 rounded-2xl border border-rose/15 bg-gradient-to-r from-rose/10 to-white/60 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-rose shadow-sm"><Sparkles size={19}/></span><div><strong className="text-xs">Shape the story with confidence</strong><p className="mt-1 text-[11px] leading-5 text-muted">Edit the content below, upload genuine certificates and preview the result. Save when everything feels right.</p></div></div>
      </AdminSection>

      <AdminSection id="profile" eyebrow="Profile" title="Identity & introduction">
        <div className="admin-panel grid gap-8 lg:grid-cols-[250px_1fr]">
          <div className="flex flex-col items-center border-b border-ink/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div className="relative mb-4 grid aspect-[.84] w-40 place-items-center overflow-hidden rounded-[24px] bg-gradient-to-br from-[#dce8e3] to-[#d8c2c7]">{data.hero.photo?<Image unoptimized fill sizes="160px" src={data.hero.photo} alt="Profile preview" className="object-cover"/>:<span className="font-display text-3xl font-semibold text-ink">SMF</span>}</div>
            <label className="admin-button"><ImagePlus size={14}/> Upload portrait<input hidden type="file" accept="image/*" onChange={e=>handleImage(e.target.files?.[0], image=>update(d=>{d.hero.photo=image}))}/></label>
            {data.hero.photo&&<button onClick={()=>update(d=>{d.hero.photo=""})} className="mt-2 text-[10px] font-semibold text-red-600">Remove photo</button>}
            <small className="mt-3 text-center text-[9px] leading-4 text-muted">JPG, PNG or WebP. Automatically resized for performance.</small>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2" label="Hero tagline"><textarea rows={3} value={data.hero.tagline} onChange={e=>update(d=>{d.hero.tagline=e.target.value})}/></Field>
            <Field className="sm:col-span-2" label="Professional profile"><textarea rows={5} value={data.about} onChange={e=>update(d=>{d.about=e.target.value})}/></Field>
            <Field label="Email"><input type="email" value={data.contact.email} onChange={e=>update(d=>{d.contact.email=e.target.value})}/></Field>
            <Field label="Phone"><input value={data.contact.phone} onChange={e=>update(d=>{d.contact.phone=e.target.value})}/></Field>
            <Field className="sm:col-span-2" label="Location"><input value={data.contact.location} onChange={e=>update(d=>{d.contact.location=e.target.value})}/></Field>
          </div>
        </div>
      </AdminSection>

      <AdminSection id="content" eyebrow="Content" title="Professional information">
        <PanelHeader title="Personal details" description="Facts presented in the About section" action={<button className="admin-button" onClick={()=>update(d=>d.personal.push(["New detail",""]))}><Plus size={13}/> Add detail</button>}/>
        <div className="admin-panel mb-5 space-y-2">{data.personal.map((item,i)=><div key={i} className="grid gap-2 sm:grid-cols-[1fr_1.5fr_auto]"><input className="admin-input" aria-label="Detail label" value={item[0]} onChange={e=>update(d=>{d.personal[i][0]=e.target.value})}/><input className="admin-input" aria-label="Detail value" value={item[1]} onChange={e=>update(d=>{d.personal[i][1]=e.target.value})}/><IconButton label="Remove detail" danger onClick={()=>update(d=>d.personal.splice(i,1))}><Trash2 size={14}/></IconButton></div>)}</div>

        <PanelHeader title="Experience responsibilities" description="Core responsibilities shown in the career journey" action={<button className="admin-button" onClick={()=>update(d=>d.responsibilities.push("New responsibility"))}><Plus size={13}/> Add item</button>}/>
        <div className="admin-panel mb-5 space-y-2">{data.responsibilities.map((item,i)=><div key={i} className="grid grid-cols-[1fr_auto] gap-2"><input className="admin-input" aria-label="Responsibility" value={item} onChange={e=>update(d=>{d.responsibilities[i]=e.target.value})}/><IconButton label="Remove responsibility" danger onClick={()=>update(d=>d.responsibilities.splice(i,1))}><Trash2 size={14}/></IconButton></div>)}</div>

        <PanelHeader title="Education" description="Qualifications, institutions and results" action={<button className="admin-button" onClick={()=>update(d=>d.education.push({degree:"New qualification",org:"",year:"",result:""}))}><Plus size={13}/> Add qualification</button>}/>
        <div className="space-y-3">{data.education.map((item,i)=><div key={i} className="admin-panel grid gap-2 md:grid-cols-[.55fr_1.3fr_1fr_1fr_auto]"><input className="admin-input" aria-label="Year" value={item.year} placeholder="Year" onChange={e=>update(d=>{d.education[i].year=e.target.value})}/><input className="admin-input" aria-label="Degree" value={item.degree} placeholder="Degree" onChange={e=>update(d=>{d.education[i].degree=e.target.value})}/><input className="admin-input" aria-label="Institution" value={item.org} placeholder="Institution" onChange={e=>update(d=>{d.education[i].org=e.target.value})}/><input className="admin-input" aria-label="Result" value={item.result} placeholder="Result" onChange={e=>update(d=>{d.education[i].result=e.target.value})}/><RowActions onUp={()=>update(d=>move(d.education,i,-1))} onDown={()=>update(d=>move(d.education,i,1))} onDelete={()=>update(d=>d.education.splice(i,1))}/></div>)}</div>
      </AdminSection>

      <AdminSection id="credentials" eyebrow="Credentials" title="Certificates & achievements" action={<button className="admin-button primary" onClick={()=>update(d=>d.credentials.push({title:"New credential",issuer:"",image:""}))}><Plus size={13}/> New credential</button>}>
        <div className="space-y-3">{data.credentials.map((item,i)=><div key={i} className="admin-panel grid items-center gap-3 md:grid-cols-[70px_1fr_1fr_auto]">
          <label className="relative grid size-16 cursor-pointer place-items-center overflow-hidden rounded-2xl bg-sage/15 text-center text-[9px] font-bold text-sage">{item.image?<Image unoptimized fill sizes="64px" src={item.image} alt="" className="object-cover"/>:<><Upload size={16}/> IMAGE</>}<input hidden type="file" accept="image/*" onChange={e=>handleImage(e.target.files?.[0],image=>update(d=>{d.credentials[i].image=image}))}/></label>
          <input className="admin-input" aria-label="Credential title" value={item.title} onChange={e=>update(d=>{d.credentials[i].title=e.target.value})}/><input className="admin-input" aria-label="Credential issuer" value={item.issuer} onChange={e=>update(d=>{d.credentials[i].issuer=e.target.value})}/><RowActions onUp={()=>update(d=>move(d.credentials,i,-1))} onDown={()=>update(d=>move(d.credentials,i,1))} onDelete={()=>update(d=>d.credentials.splice(i,1))}/>
        </div>)}</div>
        <div className="mt-8"><PanelHeader title="Certificate gallery" description="Scans, photos and professional moments" action={<label className="admin-button"><ImagePlus size={13}/> Upload images<input hidden type="file" accept="image/*" multiple onChange={async e=>{for(const file of Array.from(e.target.files??[])){const image=await compressImage(file);update(d=>d.gallery.push({title:file.name.replace(/\.[^.]+$/,""),image}))}}}/></label>}/><div className="admin-panel"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{data.gallery.length?data.gallery.map((item,i)=><div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist"><Image unoptimized fill sizes="(max-width: 640px) 50vw, 25vw" src={item.image} alt="" className="object-cover"/><button onClick={()=>update(d=>d.gallery.splice(i,1))} className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg bg-red-600 text-white shadow-lg" aria-label="Remove gallery image"><Trash2 size={13}/></button><input className="absolute inset-x-2 bottom-2 w-[calc(100%-1rem)] rounded-lg border border-white/50 bg-white/85 p-2 text-[10px] font-semibold outline-none backdrop-blur" value={item.title} aria-label="Gallery image title" onChange={e=>update(d=>{d.gallery[i].title=e.target.value})}/></div>):<div className="col-span-full rounded-2xl border border-dashed border-ink/15 py-12 text-center text-xs text-muted">No gallery images yet. Upload certificate scans to begin.</div>}</div></div></div>
      </AdminSection>

      <AdminSection id="settings" eyebrow="Data & backup" title="Keep your content portable">
        <div className="admin-panel grid gap-8 md:grid-cols-3">{[
          {title:"Export backup",body:"Download text and uploaded images as one portable JSON file.",button:<button className="admin-button" onClick={()=>exportData(data)}><Download size={13}/> Download backup</button>},
          {title:"Import backup",body:"Restore content from a previously exported portfolio file.",button:<label className="admin-button"><Upload size={13}/> Choose backup<input hidden type="file" accept="application/json" onChange={e=>importData(e,setData,setSaved,notify)}/></label>},
          {title:"Restore defaults",body:"Remove local customisations and return to the original CV.",button:<button className="admin-button danger" onClick={()=>{if(confirm("Restore original content and remove uploaded images?")){localStorage.removeItem(STORAGE_KEY);setData(cloneDefaults());setSaved(true);notify("Original content restored")}}}><RotateCcw size={13}/> Restore original</button>},
        ].map(item=><article key={item.title} className="md:border-r md:border-ink/10 md:pr-7 md:last:border-0"><h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3><p className="mb-5 mt-2 text-[11px] leading-5 text-muted">{item.body}</p>{item.button}</article>)}</div>
      </AdminSection>
      <div className="h-24"/>
    </main>
    <div role="status" aria-live="polite" className={`fixed bottom-5 right-5 z-[100] rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-white shadow-2xl transition ${toast?"translate-y-0 opacity-100":"translate-y-4 opacity-0"}`}>{toast}</div>
  </div>;
}

function AdminSection({id,eyebrow,title,children,action}:{id:string;eyebrow:string;title:string;children:React.ReactNode;action?:React.ReactNode}) { return <section id={id} className="admin-container"><div className="mb-7 flex items-end justify-between gap-4"><div><span className="text-[9px] font-extrabold uppercase tracking-[.18em] text-rose">{eyebrow}</span><h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2></div>{action}</div>{children}</section>; }
function Field({label,className="",children}:{label:string;className?:string;children:React.ReactNode}) { return <label className={`field ${className}`}>{label}{children}</label>; }
function PanelHeader({title,description,action}:{title:string;description:string;action:React.ReactNode}) { return <div className="mb-3 mt-7 flex items-end justify-between gap-4 first:mt-0"><div><h3 className="font-display text-xl font-semibold text-ink">{title}</h3><p className="text-[10px] text-muted">{description}</p></div>{action}</div>; }
function IconButton({label,danger=false,onClick,children}:{label:string;danger?:boolean;onClick:()=>void;children:React.ReactNode}) { return <button onClick={onClick} className={`grid size-10 place-items-center rounded-xl border border-ink/10 bg-white ${danger?"text-red-600":"text-ink"}`} aria-label={label}>{children}</button>; }
function RowActions({onUp,onDown,onDelete}:{onUp:()=>void;onDown:()=>void;onDelete:()=>void}) { return <div className="flex gap-1"><IconButton label="Move up" onClick={onUp}><ChevronUp size={14}/></IconButton><IconButton label="Move down" onClick={onDown}><ChevronDown size={14}/></IconButton><IconButton label="Delete" danger onClick={onDelete}><Trash2 size={14}/></IconButton></div>; }

async function compressImage(file: File, maxSize=1500, quality=.82): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose a valid image file.");
  const bitmap=await createImageBitmap(file); let width=bitmap.width,height=bitmap.height;
  if(Math.max(width,height)>maxSize){const scale=maxSize/Math.max(width,height);width=Math.round(width*scale);height=Math.round(height*scale)}
  const canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;canvas.getContext("2d")?.drawImage(bitmap,0,0,width,height);bitmap.close();return canvas.toDataURL("image/webp",quality);
}
function exportData(data: PortfolioData) { const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));const anchor=document.createElement("a");anchor.href=url;anchor.download="syeda-masooma-portfolio-backup.json";anchor.click();URL.revokeObjectURL(url); }
async function importData(event:ChangeEvent<HTMLInputElement>,setData:(data:PortfolioData)=>void,setSaved:(saved:boolean)=>void,notify:(message:string)=>void){try{const file=event.target.files?.[0];if(!file)return;const parsed=JSON.parse(await file.text()) as PortfolioData;if(!parsed.hero||!parsed.credentials)throw new Error("Invalid backup file");setData(parsed);localStorage.setItem(STORAGE_KEY,JSON.stringify(parsed));setSaved(true);notify("Backup imported successfully")}catch(error){notify(error instanceof Error?error.message:"Could not import backup")}}
