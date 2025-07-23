"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu";

export default function AuthDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full px-4 py-2 font-semibold bg-white text-[var(--primary)] shadow hover:bg-[var(--accent)] hover:text-white transition-all">Login / Sign up</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[160px] rounded-md shadow-lg bg-white text-black">
        <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">Login</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer px-4 py-2 hover:bg-gray-100">Sign up</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 