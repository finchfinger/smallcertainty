"use client";

import { FormEvent,KeyboardEvent,useEffect,useId,useRef,useState } from "react";
import { ActionButton } from "./ActionButton";

type ShareButtonProps = {
  category:string;
  title:string;
  path:string;
  triggerVariant?:"default"|"ghost"|"outline"|"text";
};

export function ShareButton({ category,title,path,triggerVariant="ghost" }:ShareButtonProps){
  const [open,setOpen]=useState(false);
  const [status,setStatus]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const titleId=useId();
  const triggerRef=useRef<HTMLButtonElement>(null);
  const emailRef=useRef<HTMLInputElement>(null);
  const messageRef=useRef<HTMLTextAreaElement>(null);
  const dialogRef=useRef<HTMLElement>(null);

  useEffect(()=>{
    if(!open) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    if(messageRef.current) {
      messageRef.current.style.height="auto";
      messageRef.current.style.height=`${Math.max(52,messageRef.current.scrollHeight)}px`;
    }
    emailRef.current?.focus();
    return ()=>{ document.body.style.overflow=previousOverflow; };
  },[open]);

  function close(){
    setOpen(false);
    setStatus("");
    window.requestAnimationFrame(()=>triggerRef.current?.focus());
  }

  function handleDialogKeyDown(event:KeyboardEvent<HTMLElement>){
    if(event.key==="Escape") {
      event.preventDefault();
      close();
      return;
    }
    if(event.key!=="Tab"||!dialogRef.current) return;
    const focusable=[...dialogRef.current.querySelectorAll<HTMLElement>("button,input,textarea")].filter(element=>!element.hasAttribute("disabled"));
    if(!focusable.length) return;
    const first=focusable[0];
    const last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first) {
      event.preventDefault();
      last.focus();
    } else if(!event.shiftKey&&document.activeElement===last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmitting(true);
    setStatus("");
    const form=new FormData(event.currentTarget);

    try {
      const response=await fetch("/api/share",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          email:form.get("email"),
          message:form.get("message"),
          website:form.get("website"),
          category,
          title,
          path,
        }),
      });
      const result=await response.json() as { error?:string };
      if(!response.ok) throw new Error(result.error||"The email could not be sent.");
      setStatus("Sent.");
    } catch(error) {
      setStatus(error instanceof Error?error.message:"The email could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function growMessage(event:FormEvent<HTMLTextAreaElement>){
    const field=event.currentTarget;
    field.style.height="auto";
    field.style.height=`${Math.max(52,field.scrollHeight)}px`;
  }

  return <>
    <ActionButton ref={triggerRef} variant={triggerVariant} aria-haspopup="dialog" aria-expanded={open} aria-controls={open?titleId:undefined} aria-label={`Share ${title}`} onClick={()=>setOpen(true)}>Share</ActionButton>
    {open&&<div className="fixed inset-0 z-[100] overflow-y-auto bg-black/20 px-5 pb-10 pt-[7vh] sm:px-8" onMouseDown={event=>{if(event.target===event.currentTarget) close();}}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={handleDialogKeyDown} className="mx-auto w-full max-w-[680px] rounded-[24px] bg-paper p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:p-8">
        <div>
          <h2 id={titleId} className="text-center text-[14px] font-normal leading-[20px] tracking-[-0.01em]">*** SHARE ***</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="sc-share-field">
            <label htmlFor={`${titleId}-email`} className="sc-share-label">Recipient email</label>
            <div className="sc-share-interactive">
              <input ref={emailRef} id={`${titleId}-email`} name="email" type="email" inputMode="email" autoComplete="email" required placeholder="Please enter your email" className="sc-share-control"/>
            </div>
          </div>
          <div className="sc-share-field mt-4">
            <label htmlFor={`${titleId}-message`} className="sc-share-label">Your Message</label>
            <div className="sc-share-interactive">
              <textarea ref={messageRef} id={`${titleId}-message`} name="message" rows={1} defaultValue={`This is worth a look: ${title}`} placeholder="A short note" className="sc-share-control sc-share-control--message" onInput={growMessage}/>
            </div>
          </div>
          <input type="hidden" name="url" value={path}/>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0"/>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <ActionButton type="submit" variant="primary" disabled={submitting}>{submitting?"Sending…":"Share"}</ActionButton>
            <ActionButton type="button" onClick={close} disabled={submitting}>Cancel</ActionButton>
          </div>
          <p aria-live="polite" className={`mt-4 text-[14px] leading-[20px] text-muted ${status?"":"sr-only"}`}>{status||"No status"}</p>
        </form>
      </section>
    </div>}
  </>;
}
