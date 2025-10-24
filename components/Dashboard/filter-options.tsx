import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownMenuProps {
  filter: string;
  setFilter: (val: string) => void;
}

export function FilterDropdownMenu({
  filter,
  setFilter,
}: FilterDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-poppins cursor-pointer">
          Choose
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-poppins bg-black text-white border-gray-500">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-500" />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={setFilter}
          defaultValue="sentTo"
          className="*:cursor-pointer *:hover:bg-gray-700"
        >
          <DropdownMenuRadioItem value="companyName">
            Company Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sentTo">Sent To</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
