import * as React from "react"
import PropTypes from "prop-types"
import { cn } from "../../lib/utils"

const NativeSelect = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-[#D9D9D9] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9CA3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2800A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%3E%3Cpath%20d%3D%22M3%205l3%203%203-3%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1em_center] bg-no-repeat pr-8",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
NativeSelect.displayName = "NativeSelect"

const NativeOption = React.forwardRef(({ className, ...props }, ref) => {
  return <option className={cn(className)} ref={ref} {...props} />
})
NativeOption.displayName = "NativeOption"

NativeOption.propTypes = {
  className: PropTypes.string,
};

NativeSelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

export { NativeSelect, NativeOption }
