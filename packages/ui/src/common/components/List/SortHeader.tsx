import React, { ReactNode } from "react";
import { HeaderText, SortIconDown, SortIconUp } from "../SortedListHeaders";
import { ListHeader } from "./ListHeader";

interface SortHeaderProps {
    onSort: () => void
    isActive: boolean
    isDescending: boolean
    children: ReactNode
  }
  
export const SortHeader = ({ onSort, isActive, isDescending, children }: SortHeaderProps) => (
    <ListHeader onClick={onSort}>
      <HeaderText>
        {children}
        {isActive && (isDescending ? <SortIconDown /> : <SortIconUp />)}
      </HeaderText>
    </ListHeader>
)