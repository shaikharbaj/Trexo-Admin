import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface IFormProps {
    register?: any;
    errors?: any;
    reset?: any;
    onSubmit?: any;
    isPending?: any;
}

const IndustryForm: React.FC<IFormProps> = ({
    register,
    errors,
    reset,
    onSubmit,
    isPending,
}) => {    
    return (
        <div className=" space-y-3">
            <form id="industry-form" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                    <Label>Industry Name</Label>
                    <Input
                    disabled={isPending}
                        type="text"
                        size="lg"
                        placeholder="Enter industry name"
                        {...register('industry_name')}
                    />
                    {errors.industry_name && (
                        <div className=" text-destructive mt-2">
                            {errors.industry_name.message}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default IndustryForm;