"use client"
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const CurrencySelect = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select One" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rupee"><Icon icon="heroicons:currency-rupee" className="w-5 h-5 inline-block" /> Rupee</SelectItem>
        <SelectItem value="dollar"><Icon icon="heroicons:currency-dollar" className="w-5 h-5 inline-block" /> Dollar</SelectItem>
        <SelectItem value="euro"><Icon icon="heroicons:currency-euro" className="w-5 h-5 inline-block" /> Euro</SelectItem>
        <SelectItem value="pound"><Icon icon="heroicons:currency-pound" className="w-5 h-5 inline-block" /> Pound</SelectItem>
        <SelectItem value="yen"><Icon icon="heroicons:currency-yen" className="w-5 h-5 inline-block" /> Yen</SelectItem>
        <SelectItem value="bangladeshi"><Icon icon="heroicons:currency-bangladeshi" className="w-5 h-5 inline-block" /> Bangladeshi</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
