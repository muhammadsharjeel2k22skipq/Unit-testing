import React, { useEffect, useState } from 'react';
import styles from '@/app/select.module.css';

type SelectOption = {
    label: string;
    value: any;
}

type SingleSelectProps = {
    multiple?: false;
    onFilterChange: ( value: SelectOption | undefined ) => void;
}
type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[] | undefined) => void;
    onFilterChange: ( value: SelectOption[] | undefined ) => void;
}

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ options,onFilterChange,multiple }: SelectProps) => {
    const [value, setValue] = useState<typeof options[0] | undefined>(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlitedIndex, setHighlitedIndex] = useState(0);

    const onChange = (value: SelectOption | undefined) => {
        if(multiple) {

        }
        else {
            setValue(value);
            onFilterChange(value);
        }
    };
    const clearOptions = (e: any) => {
        e.stopPropagation();
        onChange(undefined);
    };
    const selectOption = (e: any, option: SelectOption) => {
        e.stopPropagation();
        if(option !== value) onChange(option);
        setIsOpen(false);
    };
    const isOptionSelected = (option: SelectOption) => {
        return option === value;
    }; 

    useEffect(() => {
        setHighlitedIndex(0);
    },[isOpen]);

  return (
    <div onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)}
      className={styles.container} tabIndex={0}
     >
        <span className={styles.value}>{value?.label}</span>
        <button onClick={e => clearOptions(e)} className={styles["clear-btn"]}>&times;</button>

        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`} >
            {options?.map((option, index) => (
                <li onClick={e => selectOption(e, option)} onMouseEnter={() => setHighlitedIndex(index)}
                  className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''}
                   ${index === highlitedIndex ? styles.highlighted : ''}`} 
                  key={option.label} 
                 >
                    {option.label}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Select;
