import { MaterialIcon } from "./MaterialIcon";

const icons = { home:"apartment", clothing:"face_4", menswear:"business_center", kitchen:"skillet", children:"child_care", pets:"pets", body:"self_improvement", wellness:"self_improvement", sport:"sports_tennis", travel:"flight", office:"desk", work:"work", culture:"theaters", miscellaneous:"more_horiz", pin:"location_on" };
export function SectionIcon({ name }: { name?:string }) { return <MaterialIcon name={icons[(name || "home") as keyof typeof icons] || "home"}/>; }
