"use client";

import { useState } from "react";
import { ChevronDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@repo/ui/components/ui/command";

const models = ["gpt-4", "gpt-3.5-turbo"];

const Heading = () => {
  const [open, setOpen] = useState(false);

  const onServiceSelect = (model: string) => {
    setOpen(false);
    // TODO 새로운 대화로 push
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={"모델을 선택해주세요."}
          className={"w-[160px] text-xl justify-between border-none"}
        >
          {"Chat GPT"}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading="Services">
              {models.map((model) => (
                <CommandItem
                  key={model}
                  onSelect={() => onServiceSelect(model)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {model}
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
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                모델 만들기
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Heading;
