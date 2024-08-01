import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface IFormProps {

}

const IndustryForm: React.FC<IFormProps> = () => {
    return (
        <div className=" space-y-3">
            <div className="flex flex-col gap-2">
                <Label>Industry Name</Label>
                <Input type="text" size="lg" placeholder="Enter industry name" />
            </div>
        </div>
    )
}

export default IndustryForm;