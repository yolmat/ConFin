import {
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletMinimalIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface InfosCards {
  titleHeader: string;
  icon: string;
  value: number;
}

export default function CardsInfos({ titleHeader, icon, value }: InfosCards) {
  let verifyValue;
  if (value >= 0) {
    verifyValue = true;
  } else {
    verifyValue = false;
  }

  const formatedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Card className="flex flex-col max-w-fit max-h-fit">
      <CardHeader className="flex items-center justify-between text-2xl">
        <CardTitle className="font-bold text-lg">{titleHeader}</CardTitle>
        {icon === "revenue" ? (
          <TrendingUpIcon className="text-cardinfos-revenue size:2 lg:size-8" />
        ) : icon === "expenditure" ? (
          <TrendingDownIcon className="text-cardinfos-expenditure size:2 lg:size-8" />
        ) : (
          <WalletMinimalIcon className="text-cardinfos-extract size:2 lg:size-8" />
        )}
      </CardHeader>
      <CardContent className="md:mt-5 lg:text-center">
        <p
          className={`font-bold text-md lg:text-3xl ${
            icon === "revenue"
              ? "text-cardinfos-revenue"
              : icon === "expenditure"
              ? "text-cardinfos-expenditure"
              : icon === "extract"
              ? verifyValue === true
                ? "text-cardinfos-revenue"
                : "text-cardinfos-expenditure"
              : ""
          }`}
        >
          {formatedValue}
        </p>
      </CardContent>
    </Card>
  );
}
