import { Column } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CategoryColumn } from "./columns";

interface HeaderActionProps {
  column: Column<CategoryColumn, unknown>;
  label: string;
}

const HeaderAction: React.FC<HeaderActionProps> = ({ label, column }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-4 hover:bg-transparent"
    >
      {label}
      <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
export default HeaderAction;
