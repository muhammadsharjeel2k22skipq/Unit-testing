import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from '@/components/DynamicForm';


test('adds and removes fields', () => {
  render(<DynamicForm />);
  console.log(document.body.innerHTML);
  

});

