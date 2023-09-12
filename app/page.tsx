'use client';
import React,{ useState } from "react";
import BvForm from "@/components/NewBvForm";
import { CreatePatientForm } from "@/components/CreatePatientForm";
import Label from "@/components/Label";
import LoginForm from "@/components/LoginForm";
import PatientForm from "@/components/PatientForm";
import Select from "@/components/Select";
import Table from "@/components/Table";
import MultiSelect from "@/components/ReactSelect";
import DynamicForm from "@/components/DynamicForm";

const options = [
  {label: 'Select...', value: 0},
  {label: 'First', value: 1},
  {label: 'Second', value: 2},
  {label: 'Third', value: 3},
  {label: 'Fourth', value: 4},
  {label: 'Fifth', value: 5},
];


export default function Home() {
  return (
    <div className="flex gap-2 p-2">
      {/* <LoginForm onLogin={() => {}} /> */}
      {/* <PatientForm  onFormSubmit={() => {} }/> */}
      {/* <CreatePatientForm  /> */}
      {/* <BvForm /> */}
      {/* <Select options={options}   onFilterChange={o => console.log(o, 'option-1')}/>
      <Select options={options}   onFilterChange={o => console.log(o, 'option-2')}/> */}
      {/* <MultiSelect onConfirm={() => {}} /> */}
      <DynamicForm />
    </div>
  )
}
