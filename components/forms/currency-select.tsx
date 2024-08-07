"use client"
import { Icon } from "@iconify/react";
import {
  FormSelect,
  FormSelectContent,
  FormSelectItem,
  FormSelectTrigger,
  FormSelectValue,
} from "@/components/ui/select-react-hook-form";
import { UseFormRegister } from "react-hook-form";

interface CurrencySelectProps {
  register: UseFormRegister<any>;
  currencyValue: any;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ register, currencyValue }) => {
  return (
    <FormSelect {...register("currency_symbol")} value={currencyValue}>
      <FormSelectTrigger>
        <FormSelectValue placeholder="Select One" />
      </FormSelectTrigger>
      <FormSelectContent>
        <FormSelectItem value="RUPEE"><Icon icon="heroicons:currency-rupee" className="w-5 h-5 inline-block" /> Rupee</FormSelectItem>
        <FormSelectItem value="DOLLAR"><Icon icon="heroicons:currency-dollar" className="w-5 h-5 inline-block" /> Dollar</FormSelectItem>
        <FormSelectItem value="EURO"><Icon icon="heroicons:currency-euro" className="w-5 h-5 inline-block" /> Euro</FormSelectItem>
        <FormSelectItem value="POUND"><Icon icon="heroicons:currency-pound" className="w-5 h-5 inline-block" /> Pound</FormSelectItem>
        <FormSelectItem value="YEN"><Icon icon="heroicons:currency-yen" className="w-5 h-5 inline-block" /> Yen</FormSelectItem>
        <FormSelectItem value="BANGLADESHI"><Icon icon="heroicons:currency-bangladeshi" className="w-5 h-5 inline-block" /> Bangladeshi</FormSelectItem>
      </FormSelectContent>
    </FormSelect>
  );
};

export default CurrencySelect;
