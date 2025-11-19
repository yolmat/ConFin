import CardsInfos from "@/components/app-cards-infos";
import ExtractDash from "./ExtractDash";

export default function InfosDash() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid justify-items-center auto-rows-min gap-4 md:grid-cols-3">
        <CardsInfos titleHeader="Receitas" icon="revenue" value={1000.0} />
        <CardsInfos titleHeader="Despesas" icon="expenditure" value={2000.0} />
        <CardsInfos titleHeader="Extrato" icon="extract" value={-1000.0} />
      </div>
      <ExtractDash />
    </div>
  );
}
