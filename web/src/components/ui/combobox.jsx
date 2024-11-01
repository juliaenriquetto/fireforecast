"use client";
 
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
 
const frameworks = [
  { value: "ac", label: "Acre" },
  { value: "al", label: "Alagoas" },
  { value: "am", label: "Amazonas" },
  { value: "ba", label: "Bahia" },
  { value: "ce", label: "Ceará" },
  { value: "es", label: "Espírito Santo" },
  { value: "ce", label: "Ceará" },
  { value: "go", label: "Goiás" },
  { value: "ma", label: "Maranhão" },
  { value: "mt", label: "Mato Grosso" },
  { value: "ms", label: "Mato Grosso do Sul" },
  { value: "mg", label: "Minas Gerais" },
  { value: "pa", label: "Pará" },
  { value: "pb", label: "Paraíba" },
  { value: "pr", label: "Paraná" },
  { value: "pe", label: "Pernambuco" },
  { value: "pi", label: "Piauí" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "rn", label: "Rio Grande do Norte" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "ro", label: "Rondônia" },
  { value: "rr", label: "Roraima" },
  { value: "sc", label: "Santa Catarina" },
  { value: "sp", label: "São Paulo" },
  { value: "se", label: "Sergipe" },
  { value: "to", label: "Tocantins" },
  { value: "df", label: "Distrito Federal" },
];
 
export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Selecione seu estado..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Procurar estado..." />
          <CommandList>
            <CommandEmpty>Estado não encontrado.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

