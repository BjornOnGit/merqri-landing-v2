import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const Select = React.forwardRef(({ className, children, onValueChange, defaultValue, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || "")
  const [selectedLabel, setSelectedLabel] = React.useState("")
  const containerRef = React.useRef(null)

  // Find the label for the selected value
  React.useEffect(() => {
  if (!children) return;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectContent && child.props.children) {
      React.Children.forEach(child.props.children, (option) => {
        if (
          React.isValidElement(option) &&
          option.props.value === selectedValue
        ) {
          setSelectedLabel(option.props.children);
        }
      });
    }
  });
}, [children, selectedValue]);


  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
  <div ref={containerRef} className={cn("relative", className)} {...props}>
    <input type="hidden" name={props.name} value={selectedValue} ref={ref} />
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === SelectTrigger) {
        return React.cloneElement(child, {
          onClick: () => setIsOpen(!isOpen),
          selectedValue,
          selectedLabel,
          isOpen,
        });
      }
      return null;
    })}
    {isOpen && (
      <div className="absolute z-50 mt-1 w-full rounded-md border border-[#D9D9D9] bg-white shadow-lg">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectContent) {
            return React.cloneElement(child, {
              onSelect: (value) => {
                setSelectedValue(value);
                setIsOpen(false);
                if (onValueChange) onValueChange(value);
              },
            });
          }
          return null;
        })}
      </div>
    )}
  </div>
);

})
Select.displayName = "Select"


const SelectTrigger = React.forwardRef(({ className, children, selectedLabel, isOpen, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-[#D9D9D9] bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F2800A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="truncate">{selectedLabel || children}</span>
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"


const SelectContent = React.forwardRef(({ className, children, onSelect, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("py-1 max-h-[300px] overflow-auto", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect: () => onSelect(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, onSelect, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-[#F8F9FA] hover:text-[#000000] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      onClick={onSelect}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-[#F2800A] opacity-0 data-[selected]:opacity-100" />
      </span>
      <span className="truncate">{children}</span>
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }