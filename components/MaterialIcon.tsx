export function MaterialIcon({ name, className="", size=22, label }:{ name:string; className?:string; size?:number; label?:string }) {
  return <span className={`material-symbols-outlined shrink-0 ${className}`} style={{fontSize:size}} aria-hidden={label?undefined:true} aria-label={label}>{name}</span>;
}
