import {
  getPhoneMaxLength,
  phone_codes,
  validatePhoneNumber,
} from "@/constants/currency";
import { cn } from "@/lib/utils";
import useCommonStore, { useCurrentPhoneCode } from "@/stores/store";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";

interface Props<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
> {
  field: ControllerRenderProps<T, TName>;
  label: string;
  isRequired?: boolean;
  inputClassName?: string;
  className?: React.InputHTMLAttributes<HTMLInputElement>["className"];
  disabled?: boolean;
  showLabel?: boolean;
  initialBlur?: boolean;
  hideCountryCodeSelector?: boolean;
}
function InputPhoneNumber<
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
>({
  field,
  label,
  isRequired,
  className,
  disabled = false,
  showLabel = true,
  initialBlur = false,
  inputClassName,
  hideCountryCodeSelector = false,
}: Props<T, TName>) {
  const ref = useRef<HTMLInputElement>(null);
  const selectedPhoneCode = useCurrentPhoneCode();
  const setShowCountryCodeSelector = useCommonStore(
    (state) => state.setShowCountryCodeSelector,
  );
  const setCountryCode = useCommonStore((state) => state.setCountryCode);
  const form = useFormContext();
  const validator = selectedPhoneCode?.validator;

  const extractPhoneFromInput = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");

    if (!digitsOnly) {
      return { countryCode: undefined as string | undefined, localNumber: "" };
    }

    // Find matching country code by longest prefix
    // is number 38583048840 then matchingCodes will be +38 and +385
    const matchingCodes = phone_codes.filter((item) =>
      digitsOnly.startsWith(item.phone_code),
    );

    if (!matchingCodes.length) {
      return {
        countryCode: undefined as string | undefined,
        localNumber: digitsOnly,
      };
    }

    // get the best match country code like if +38 and +385 then get +385
    const bestMatch = matchingCodes.reduce((prev, curr) =>
      curr.phone_code.length > prev.phone_code.length ? curr : prev,
    );

    const localNumber = digitsOnly.slice(bestMatch.phone_code.length);

    return { countryCode: bestMatch.phone_code, localNumber };
  };

  const handleShowCountryCodeSelector = useCallback(() => {
    setShowCountryCodeSelector(true);
  }, [setShowCountryCodeSelector]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const invalidKeys = ["e", "E", "-"];
      if (invalidKeys?.includes(event.key)) {
        event.preventDefault();
      }
    },
    [],
  );

  const handleValidation = (value: string, validator: string) => {
    if (validator) {
      const isValid = validatePhoneNumber(value, new RegExp(validator));
      if (!isValid) {
        form.setError(field.name, { message: "Invalid phone number" });
      } else {
        form.clearErrors(field.name);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    // Only sanitize & trim on manual typing; country detection is handled on paste
    const digitsOnly = rawValue.replace(/\D/g, "");

    // Get maximum allowed length for the current country based on regex pattern
    const maxLength = validator ? getPhoneMaxLength(validator) : 15;

    // Restrict input to maximum length to prevent over-typing
    const restrictedValue = digitsOnly.slice(0, maxLength);

    // Update the field value immediately
    field.onChange(restrictedValue);
    // Use debounced validation
    void handleValidation(restrictedValue, validator);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");

    // if pasted text not start with + then set the value and validate
    if (!pastedText.startsWith("+")) {
      return;
    }
    event.preventDefault();

    // Sanitize and extract potential country code
    const { countryCode, localNumber } = extractPhoneFromInput(pastedText);

    if (countryCode) {
      setCountryCode(countryCode);
    }

    // Get maximum allowed length for the current country
    const maxLength = validator ? getPhoneMaxLength(validator) : 15;

    // Restrict pasted content to maximum length
    const restrictedValue = localNumber.slice(0, maxLength);

    // Update the field value
    field.onChange(restrictedValue);
    // Use debounced validation
    void handleValidation(restrictedValue, validator);
  };

  useEffect(() => {
    if (initialBlur && ref && ref.current) {
      ref.current.blur();
    }
  }, [initialBlur]);

  useEffect(() => {
    if (field.value) {
      void handleValidation(field.value as string, validator);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validator]);

  // Memoized CSS classes
  const inputContainerClasses = cn(
    "h-[4.4rem] w-full rounded-lg border border-primary-20 bg-white dark:bg-primary-100/50 dark:border-primary-90 flex items-center text-sm",
    inputClassName,
  );
  const inputClasses = cn(
    typeof field.value === "string" &&
      (field.value as string).includes("ENCRYPTED") &&
      "blur-sm",
    "h-[4.2rem] w-full px-2 py-space8 rounded-r-lg focus:outline-none dark:bg-primary-100/50    dark:text-primary-40",
  );

  return (
    <FormItem className={className}>
      {showLabel && (
        <FormLabel className="dark:text-primary-30">
          {label} {isRequired && <span className="text-error-100">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <div className={inputContainerClasses}>
          <div className="flex items-center gap-2">
            {!hideCountryCodeSelector ? (
              <button
                type="button"
                disabled={disabled}
                onClick={handleShowCountryCodeSelector}
                className={cn(
                  "justify-between gap-1 h-[2.8rem] flex items-center w-20 px-2 border-r border-primary-20 dark:border-r-primary-70",
                  disabled ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                {selectedPhoneCode?.flag?.startsWith("http") ? (
                  <img
                    src={selectedPhoneCode?.flag}
                    alt={selectedPhoneCode?.country}
                    className="w-8 h-8 rounded-sm"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-lg">{selectedPhoneCode?.flag}</span>
                )}

                <ChevronDown className=" h-7 w-7 shrink-0 text-primary-60" />
              </button>
            ) : (
              // hide country code selector and add width 4 for better UI
              <div className="w-4"></div>
            )}

            <span className="text-sm text-primary-40">
              +{selectedPhoneCode?.phone_code}
            </span>
          </div>

          <input
            type="number"
            placeholder="XXXXXXXXXX"
            {...field}
            onChange={handleChange}
            onPaste={handlePaste}
            inputMode="numeric"
            ref={ref}
            className={inputClasses}
            onKeyDown={handleKeyDown}
            onWheel={(e) => {
              if (e.target) {
                (e.target as HTMLInputElement)?.blur();
              }
            }}
            maxLength={validator ? getPhoneMaxLength(validator) : 15}
            disabled={disabled}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default React.memo(InputPhoneNumber) as <
  T extends FieldValues,
  TName extends FieldPath<T> = FieldPath<T>,
>(
  props: Props<T, TName>,
) => React.JSX.Element;
