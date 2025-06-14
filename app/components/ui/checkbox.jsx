import * as React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input 
      type="checkbox" 
      className="peer absolute h-4 w-4 cursor-pointer opacity-0" 
      ref={ref}
      checked={checked}
      onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)} 
      {...props} />
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border border-[#D9D9D9] text-current peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#F2800A] peer-focus-visible:ring-offset-2",
          checked ? "bg-[#F2800A] border-[#F2800A] text-white" : "bg-white",
          className,
        )}
      >
        {checked && <Check className="h-3 w-3" />}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }