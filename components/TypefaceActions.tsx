import { ActionLink } from "./ActionButton";

type TypefaceActionsProps = {
  href?:string;
  variant?:"default"|"outline"|"text";
};

export function TypefaceActions({ href,variant="outline" }:TypefaceActionsProps) {
  if(!href) return null;
  return <div className="flex flex-wrap gap-0">
    <ActionLink href={href} target="_blank" rel="noreferrer" variant={variant}>Visit site</ActionLink>
  </div>;
}
