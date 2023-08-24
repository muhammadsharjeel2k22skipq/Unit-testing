'use client';
import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import { CMultiSelect } from '@coreui/react-pro';
import { Component, FunctionComponent, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Patient } from '@/components/types/patient';

interface PatientFormProps {
    onConfirm?: (data: any) => void;
    patient?: Patient;
    edit?: boolean;
}

interface SelectType {
    value: string;
    text: string;
    selected?: boolean;
}

export const CreatePatientForm: FunctionComponent<PatientFormProps> = ({
    onConfirm,
    patient = undefined,
    edit = false
}) => {
    const [isLoader, setIsLoader] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [duplicate, setDuplicate] = useState<any>(false);
    const [message, setMessage] = useState<string>('');
    const [date, setDate] = useState<any>({ m: '', d: '', y: '' });
    const [searchInsurance, setSearchInsurance] = useState<string>('');
    const [searchClinics, setSearchClinics] = useState<string>('');
    const [primaryInsurance, setPrimaryInsurance] = useState<SelectType>({ value: '', text: '' });
    const [secondaryInsurance, setSecondaryInsurance] = useState<SelectType>({
        value: '',
        text: ''
    });
    const [patientClinic, setPatientClinic] = useState<SelectType>({ value: '', text: '' });
    const [items, setItems] = useState<{ insurances?: SelectType[]; clinics?: SelectType[] }>({
        insurances: [],
        clinics: []
    });
    const multiSelectRef = useRef(null);
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        setValue,
        setError,
        clearErrors
    } = useForm<Patient>({ mode: 'onBlur' });

    const years = Array.from({ length: new Date().getFullYear() }, (v, k) => k + 1)
        .filter((e) => e >= 1920)
        .reverse();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const days = Array.from({ length: 31 }, (v, k) => `${k + 1 < 10 ? `0${k + 1}` : k + 1}`);




    const onSubmit = async (data: any) => {
        if(onConfirm !== undefined) {
            onConfirm({ data });
        }

        console.log(data);
    };

   

    return (
        <div>
            <CForm style={{ fontSize: '16px' }} onSubmit={handleSubmit(onSubmit)}>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="firstname" className="text-white form-label-custom">
                            {`Patient's First Name *`}
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="firstname"
                            placeholder={'First Name*'}
                            className="bg-light-gray form-input-text-custom"
                            {...register('firstname', {
                                required: 'The field First Name is required'
                            })}
                            //disabled={edit && patient?.firstname ? true : false}
                        />
                        <div style={{ height: '22px' }}>
                            <span data-testid="firstNameError" className="text-danger">
                                {errors.firstname?.message as string ?? ''}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="ta_emrid" className="text-white form-label-custom">
                            EMRID *
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="ta_emrid"
                            placeholder={'EMRID*'}
                            className="bg-light-gray form-input-text-custom"
                            {...register('ta_emrid', {
                                required: 'The field EMRID is required',
                                value: null
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span data-testid="emridError" className="text-danger">
                                {errors.ta_emrid?.message as string ?? ''}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="lastname" className="text-white form-label-custom">
                            {`Patient's Last Name *`}
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="lastname"
                            placeholder="Last Name*"
                            className="bg-light-gray form-input-text-custom"
                            {...register('lastname', {
                                required: 'The field Last Name is required'
                            })}
                            //disabled={edit && patient?.lastname ? true : false}
                        />
                        <div style={{ height: '22px' }}>
                            <span data-testid="lastNameError" className="text-danger">
                                {errors.lastname?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="parentcustomerid_account"
                            className="text-white form-label-custom">
                            Clinic
                        </CFormLabel>
                        <Controller
                            control={control}
                            name="parentcustomerid_account"
                            defaultValue={null}
                            render={({ field: { onChange } }) => (
                                <CMultiSelect
                                    className="multiselect"
                                    /* onFilterChange={(e) => {
                                        setSearchInsurance(e);
                                    }} */
                                    onChange={onChange}
                                    multiple={false}
                                    ref={multiSelectRef}
                                    options={
                                        items.clinics
                                            ? items.clinics.map((clinic) => {
                                                  if (clinic.value == patientClinic.value) {
                                                      return {
                                                          text: clinic.text,
                                                          value: clinic.value,
                                                          selected: true
                                                      };
                                                  } else {
                                                      return clinic;
                                                  }
                                              })
                                            : [{ value: '', text: '---' }]
                                    }
                                />
                            )}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="birthdate" className="text-white form-label-custom">
                            DOB *
                        </CFormLabel>
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row gap-3">
                                <CFormSelect
                                    data-testid="month"
                                    name="month"
                                    // required
                                    className="bg-light-gray form-input-text-custom"
                                    //disabled={edit && patient?.birthdate ? true : false}
                                    onChange={(event: any) => {
                                        setDate({ ...date, m: event.target.value });
                                        clearErrors('birthdate');
                                    }}>
                                    <option value="" hidden>
                                        mm
                                    </option>
                                    {months.map((month) => (
                                        <option
                                            key={month}
                                            value={month}
                                            selected={
                                                edit && patient?.birthdate
                                                    ? month == date.m
                                                        ? true
                                                        : false
                                                    : false
                                            }>
                                            {month}
                                        </option>
                                    ))}
                                </CFormSelect>

                                <CFormSelect
                                    data-testid="day"
                                    // required
                                    className="bg-light-gray form-input-text-custom"
                                    //disabled={edit && patient?.birthdate ? true : false}
                                    onChange={(event: any) => {
                                        setDate({ ...date, d: event.target.value });
                                        clearErrors('birthdate');
                                    }}>
                                    <option value="" hidden>
                                        dd
                                    </option>
                                    {days.map((day) => (
                                        <option
                                            key={day}
                                            value={day}
                                            selected={
                                                edit && patient?.birthdate
                                                    ? day == date.d
                                                        ? true
                                                        : false
                                                    : false
                                            }>
                                            {day}
                                        </option>
                                    ))}
                                </CFormSelect>

                                <CFormSelect
                                    data-testid="year"
                                    // required
                                    className="bg-light-gray form-input-text-custom"
                                    //disabled={edit && patient?.birthdate ? true : false}
                                    onChange={(event: any) => {
                                        setDate({ ...date, y: event.target.value });
                                        clearErrors('birthdate');
                                    }}>
                                    <option value="" hidden>
                                        yyyy
                                    </option>
                                    {years.map((year) => (
                                        <option
                                            key={year}
                                            value={year}
                                            selected={
                                                edit && patient?.birthdate
                                                    ? year.toString() == date.y
                                                        ? true
                                                        : false
                                                    : false
                                            }>
                                            {year}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </div>
                        </div>
                        <div style={{ height: '22px' }}>
                            <span data-testid="nobderror" className="text-danger">
                                {errors.birthdate?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="ta_primaryinsurance"
                            className="text-white form-label-custom">
                            Primary Insurance
                        </CFormLabel>
                        <Controller
                            control={control}
                            name="ta_primaryinsurance"
                            defaultValue={null}
                            render={({ field: { onChange } }) => (
                                <CMultiSelect
                                    className="multiselect"
                                    onFilterChange={(e) => {
                                        setSearchInsurance(e);
                                    }}
                                    onChange={onChange}
                                    multiple={false}
                                    ref={multiSelectRef}
                                    options={
                                        items.insurances
                                            ? items.insurances.map((insurance) => {
                                                  if (insurance.value == primaryInsurance.value) {
                                                      return {
                                                          text: insurance.text,
                                                          value: insurance.value,
                                                          selected: true
                                                      };
                                                  } else {
                                                      return insurance;
                                                  }
                                              })
                                            : [{ value: '', text: '---' }]
                                    }
                                    virtualScroller
                                />
                            )}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.ta_primaryinsurance ? (
                                    <Component>{errors.ta_primaryinsurance.message}</Component>
                                ) : (
                                    ''
                                )}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="gendercode" className="text-white form-label-custom">
                            Gender
                        </CFormLabel>
                        <CFormSelect
                            data-testid="genderSelect"
                            id="gendercode"
                            className="bg-light-gray form-input-text-custom"
                            {...register('gendercode', { value: null })}>
                            <option value="" disabled selected>
                                ---
                            </option>
                            <option
                                value="1"
                                selected={edit && patient?.gendercode == '1' ? true : false}>
                                Male
                            </option>
                            <option
                                value="2"
                                selected={edit && patient?.gendercode == '2' ? true : false}>
                                Female
                            </option>
                        </CFormSelect>
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">{errors.gendercode?.message as string}</span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="ta_primarymemberid"
                            className="text-white form-label-custom">
                            Primary Member ID
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="ta_primarymemberid"
                            placeholder="---"
                            className="bg-light-gray form-input-text-custom"
                            {...register('ta_primarymemberid')}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.ta_primarymemberid?.message as string}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="preferredcontactmethodcode"
                            className="text-white form-label-custom">
                            Contact Method
                        </CFormLabel>
                        <CFormSelect
                            id="preferredcontactmethodcode"
                            className="bg-light-gray form-input-text-custom"
                            {...register('preferredcontactmethodcode')}
                            aria-label="Default select example">
                            <option value="1">Any</option>
                            <option value="2">Email</option>
                            <option value="3">Phone</option>
                            <option value="4">Fax</option>
                            <option value="5">Mail</option>
                        </CFormSelect>
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.preferredcontactmethodcode?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="ta_secondaryinsurance"
                            className="text-white form-label-custom">
                            Secondary Insurance
                        </CFormLabel>
                        <Controller
                            control={control}
                            name="ta_secondaryinsurance"
                            defaultValue={null}
                            render={({ field: { onChange } }) => (
                                <CMultiSelect
                                    className="multiselect"
                                    onFilterChange={(e) => {
                                        setSearchInsurance(e);
                                    }}
                                    onChange={onChange}
                                    multiple={false}
                                    ref={multiSelectRef}
                                    options={
                                        items.insurances
                                            ? items.insurances.map((insurance) => {
                                                  if (insurance.value == secondaryInsurance.value) {
                                                      return {
                                                          text: insurance.text,
                                                          value: insurance.value,
                                                          selected: true
                                                      };
                                                  } else {
                                                      return insurance;
                                                  }
                                              })
                                            : [{ value: '', text: '---' }]
                                    }
                                    virtualScroller
                                />
                            )}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.ta_secondaryinsurance ? (
                                    <Component>{errors.ta_secondaryinsurance.message}</Component>
                                ) : (
                                    ''
                                )}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="mobilephone" className="text-white form-label-custom">
                            Mobile Phone
                        </CFormLabel>
                        <CFormInput
                            type="tel"
                            id="mobilephone"
                            placeholder="---"
                            className="bg-light-gray form-input-text-custom"
                            {...register('mobilephone', {
                                maxLength: {
                                    value: 12,
                                    message: 'Mobile phone with a maximum of 12 digits are allowed.'
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Invalid mobile phone.'
                                },
                                pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                    message: 'Invalid mobile phone.'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">{errors.mobilephone?.message as string}</span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="ta_secondarymemberid"
                            className="text-white form-label-custom">
                            Secondary Member ID
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="ta_secondarymemberid"
                            placeholder="---"
                            className="bg-light-gray form-input-text-custom"
                            {...register('ta_secondarymemberid')}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.ta_secondarymemberid?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="ta_patientemail"
                            className="text-white form-label-custom">
                            Email
                        </CFormLabel>
                        <CFormInput
                            data-testid="patientEmail"
                            type="text"
                            id="emailaddress1"
                            placeholder="---"
                            className={`bg-light-gray form-input-text-custom ${
                                errors.emailaddress1 ? 'border-danger' : 'border-0'
                            }`}
                            {...register('emailaddress1', {
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Enter a valid Email.'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.emailaddress1?.message as string}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="address1_line1"
                            className="text-white form-label-custom">
                            Street 1
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="address1_line1"
                            placeholder="---"
                            className={`bg-light-gray form-input-text-custom ${
                                errors.address1_line1 ? 'border-danger' : 'border-0'
                            }`}
                            {...register('address1_line1', {
                                minLength: {
                                    value: 3,
                                    message: 'Street 1 is invalid.'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.address1_line1?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="address1_city"
                            className="text-white form-label-custom">
                            City
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="address1_city"
                            placeholder="---"
                            className={`bg-light-gray form-input-text-custom ${
                                errors.address1_city ? 'border-danger' : 'border-0'
                            }`}
                            {...register('address1_city', {
                                minLength: {
                                    value: 2,
                                    message: 'City is invalid.'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.address1_city?.message as string}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="address1_stateorprovince"
                            className="text-white form-label-custom">
                            State/Province
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="address1_stateorprovince"
                            placeholder="---"
                            className={`bg-light-gray form-input-text-custom ${
                                errors.address1_stateorprovince ? 'border-danger' : 'border-0'
                            }`}
                            {...register('address1_stateorprovince', {
                                minLength: {
                                    value: 2,
                                    message: 'State/Province is invalid.'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.address1_stateorprovince?.message as string}
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel
                            htmlFor="address1_postalcode"
                            className="text-white form-label-custom">
                            Zip/Postal Code
                        </CFormLabel>
                        <CFormInput
                            type="text"
                            id="address1_postalcode"
                            placeholder="---"
                            className={`bg-light-gray form-input-text-custom ${
                                errors.address1_postalcode ? 'border-danger' : 'border-0'
                            }`}
                            {...register('address1_postalcode', {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Enter a valid Zip code'
                                }
                            })}
                        />
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.address1_postalcode?.message as string}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <CRow hidden>
                    <CCol md={6} hidden>
                        <CFormLabel
                            hidden
                            htmlFor="customertypecode"
                            className="text-white form-label-custom">
                            Relationship Type
                        </CFormLabel>
                        <CFormSelect
                            hidden
                            id="customertypecode"
                            className="bg-light-gray form-input-text-custom"
                            defaultValue={'100000011'}
                            {...register('customertypecode')}
                            aria-label="Default select example">
                            <option value="100000011">Patient</option>
                        </CFormSelect>
                        <div style={{ height: '22px' }}>
                            <span className="text-danger">
                                {errors.ta_primarymemberid?.message as string}
                            </span>
                        </div>
                    </CCol>
                </CRow>
                <div className="mt-2">
                    <CRow className="submit-p m-1">
                        <CButton
                            onClick={() => setIsConfirmation(true)}
                            disabled={isLoader}
                            className="submit-text-p d-flex bg-transparent border-0 align-items-center justify-content-center 
                                text-white w-100 h-100 m-0">
                            {isLoader ? 'Submitting...' : 'SUBMIT'}
                        </CButton>
                    </CRow>
                </div>

                <CButton type="submit">Create</CButton>
            </CForm>
        </div>
    );
};
