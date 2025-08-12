"use client";
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from '../../../icons';
import DatePicker from '@/components/form/date-picker';
import TextArea from '../input/TextArea';

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "Technique", label: "Technique" },
    { value: "Mécanique", label: "Mécanique" },
    { value: "logiciel", label: "Development" },
  ];
   const options2 = [
    { value: "usine1", label: "usine1" },
    { value: "Usine2", label: "Usine2" },
    { value: "Usine3", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="déclaration du ticket">
      <div className="space-y-6 ">
        <div>
          <Label>Titre</Label>
          <Input type="text" />
        </div>
        
        <div>
          <Label>selectionner le type du ticket</Label>
          <div className="relative">
            <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>
       

        

        
       <div>
          <Label>Description</Label>
          <TextArea rows={4}  />
        </div>


        <div>
          <Label>selectionner la localisation</Label>
          <div className="relative">
            <Select
            options={options2}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon/>
            </span>
          </div>
        </div>
        
      </div>
    </ComponentCard>
  );
}
