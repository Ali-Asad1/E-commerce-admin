"use client";

import {
  Check as CheckIcon,
  ChevronsUpDown as ChevronsUpDownIcon,
  PlusCircle as PlusCircleIcon,
  Store as StoreIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { StoreType } from "@/types/Store.type";

import { useStoreModal } from "@/hooks/states/useStoreModal";

import { cn } from "@/utils/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StoreSwitcherProps extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  items: Pick<StoreType, "name" | "id">[];
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({ items = [], className }) => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const { push } = useRouter();

  const { onOpen: onOpenStoreModal } = useStoreModal();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store ..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    if (item.value === currentStore?.value) return null;
                    onStoreSelect(item);
                  }}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {item.label}
                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", item.value === currentStore?.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpenStoreModal();
                }}
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default StoreSwitcher;
