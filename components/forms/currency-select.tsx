"use client"
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormRegister } from "react-hook-form";

interface CurrencySelectProps {
  register: UseFormRegister<any>;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ register }) => {
  return (
    <Select {...register("currency_symbol")}>
      <SelectTrigger>
        <SelectValue placeholder="Select One" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="RUPEE"><Icon icon="heroicons:currency-rupee" className="w-5 h-5 inline-block" /> Rupee</SelectItem>
        <SelectItem value="DOLLAR"><Icon icon="heroicons:currency-dollar" className="w-5 h-5 inline-block" /> Dollar</SelectItem>
        <SelectItem value="EURO"><Icon icon="heroicons:currency-euro" className="w-5 h-5 inline-block" /> Euro</SelectItem>
        <SelectItem value="POUND"><Icon icon="heroicons:currency-pound" className="w-5 h-5 inline-block" /> Pound</SelectItem>
        <SelectItem value="YEN"><Icon icon="heroicons:currency-yen" className="w-5 h-5 inline-block" /> Yen</SelectItem>
        <SelectItem value="BANGLADESHI"><Icon icon="heroicons:currency-bangladeshi" className="w-5 h-5 inline-block" /> Bangladeshi</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
