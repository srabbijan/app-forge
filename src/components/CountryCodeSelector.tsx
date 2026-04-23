import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { phone_codes, type IPhoneCode } from "@/constants/currency";
import { cn } from "@/lib/utils";
import {
  useCommonStore,
  useCurrentPhoneCode,
  useShowCountryCodeSelector,
} from "@/stores/store";
import { useCallback } from "react";

export default function CountryCodeSelector() {
  const showCountryCodeSelector = useShowCountryCodeSelector();
  const setShowCountryCodeSelector = useCommonStore(
    (state) => state.setShowCountryCodeSelector,
  );
  const selectedPhoneCode = useCurrentPhoneCode();
  const setPhoneCode = useCommonStore((state) => state.setPhoneCode);
  const handleSelectPhoneCode = useCallback(
    (phoneCode: IPhoneCode) => {
      if (selectedPhoneCode?.id === phoneCode.id) return;
      setPhoneCode(phoneCode);
      setShowCountryCodeSelector(false);
    },
    [setPhoneCode, setShowCountryCodeSelector, selectedPhoneCode],
  );
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const scrollArea = e.currentTarget;
    scrollArea.scrollTop += e.deltaY;
  }, []);
  return (
    <Dialog
      open={showCountryCodeSelector}
      onOpenChange={setShowCountryCodeSelector}
    >
      <DialogContent className="max-w-md">
        <DialogHeader className="p-3 flex items-center justify-between">
          <DialogTitle className="text-sm dark:text-primary-30">
            Select Country Code
          </DialogTitle>
        </DialogHeader>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search phone code..." />
            <CommandEmpty>No currency found.</CommandEmpty>
            <ScrollArea
              className="h-[600px] overflow-y-scroll"
              onWheel={handleWheel}
            >
              <CommandGroup>
                {phone_codes.map((phoneCode) => (
                  <CommandItem
                    value={`${phoneCode.phone_code} ${phoneCode.country}`}
                    key={phoneCode.id}
                    className={cn(
                      "cursor-pointer transition-colors dark:text-primary-40",
                      "!bg-transparent data-[highlighted]:!bg-transparent",
                      selectedPhoneCode?.id === phoneCode.id &&
                        "!bg-primary-10 dark:!bg-primary-70",
                      selectedPhoneCode?.id !== phoneCode.id && [
                        "hover:!bg-primary-10 dark:hover:!bg-primary-70",
                        "data-[highlighted]:hover:!bg-primary-10",
                        "dark:data-[highlighted]:hover:!bg-primary-70",
                      ],
                    )}
                    onSelect={() => handleSelectPhoneCode(phoneCode)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {phoneCode.flag.startsWith("http") ? (
                        <img
                          src={phoneCode.flag}
                          alt={phoneCode.country}
                          className="w-8 h-8 rounded-sm"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-lg">{phoneCode.flag}</span>
                      )}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">
                            {phoneCode.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            +{phoneCode.phone_code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
        <DialogDescription className="sr-only">Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
