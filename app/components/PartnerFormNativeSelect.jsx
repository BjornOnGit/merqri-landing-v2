"use client"

// Import the FormField, FormItem, FormLabel, FormControl, and FormMessage components
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../components/ui/form"

// Import the NativeSelect and NativeOption components
import { NativeSelect, NativeOption } from "../components/ui/native-select"

// Then in your form fields:
import PropTypes from "prop-types";

const PartnerFormNativeSelect = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="companySize"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#363E51]">Company Size</FormLabel>
          <FormControl>
            <NativeSelect
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            >
              <NativeOption value="" disabled>
                Select company size
              </NativeOption>
              <NativeOption value="1-5">1-5 employees</NativeOption>
              <NativeOption value="6-20">6-20 employees</NativeOption>
              <NativeOption value="21-50">21-50 employees</NativeOption>
              <NativeOption value="51-100">51-100 employees</NativeOption>
              <NativeOption value="100+">100+ employees</NativeOption>
            </NativeSelect>
          </FormControl>
          <FormMessage className="text-[#FF0000]" />
        </FormItem>
      )}
    />
  )
}

PartnerFormNativeSelect.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};

export default PartnerFormNativeSelect
