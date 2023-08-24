import BvForm from "@/components/BvForm";
import { CreatePatientForm } from "@/components/CreatePatientForm";
import Label from "@/components/Label";
import LoginForm from "@/components/LoginForm";
import PatientForm from "@/components/PatientForm";
import Table from "@/components/Table";


export default function Home() {
  
  return (
    <div>
      {/* <LoginForm onLogin={() => {}} /> */}
      {/* <PatientForm  onFormSubmit={() => {} }/> */}
      {/* <CreatePatientForm  /> */}
      <BvForm />
    </div>
  )
}
