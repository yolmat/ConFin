import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TrendingUpIcon } from "lucide-react";

export default function ExtractDash() {
  return (
    <div className="bg-muted/50 min-h-100vh flex-1 rounded-xl md:min-h-min p-4">
      <header className="mb-3 font-medium text-lg">Transações Recentes</header>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="flex items-center gap-3">
              <TrendingUpIcon className="bg-cardinfos-bg-revenue text-cardinfos-revenue rounded-xl p-1" />
              <div>
                <p className="font-medium">Salario</p>
                <p>12/09/2003</p>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium text-cardinfos-revenue">
              R$ 1.000,00
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
