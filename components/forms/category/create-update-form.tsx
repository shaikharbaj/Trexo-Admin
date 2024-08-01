import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface IFormProps { }

const CategoryForm: React.FC<IFormProps> = () => {
    return (
        <div className=" space-y-3">
            <div className="flex flex-col gap-2">
                <Label>Industry Name</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" className="whitespace-nowrap" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Health Care">Health Care</SelectItem>
                        <SelectItem value="Solar">Solar</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Category Name</Label>
                <Input type="text" size="lg" placeholder="Enter category name" />
            </div>
        </div>
    )
}

export default CategoryForm;