import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { CreatePatientForm } from '@/components/CreatePatientForm'; 
import '@testing-library/user-event';

test('Create patient form testing', async () => {
  const onFormSubmit = jest.fn();
  render(<CreatePatientForm onConfirm={onFormSubmit} />);

  fireEvent.change(screen.getByPlaceholderText('First Name*'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('EMRID*'), { target: { value: '12345' } });
  fireEvent.change(screen.getByPlaceholderText("Last Name*"), { target: { value: 'Doe' } });


  const gender = screen.getByRole('combobox', {
      name: /gender/i
  });
  fireEvent.change(screen.getByTestId('genderSelect'), { target: { value: '1' } }); // 1=Male && 2=Female

  fireEvent.input(getPrimaryMemberID(), { target: { value: '11673110' } });

  const contactMethod = screen.getByRole('combobox', {
      name: /default select example/i
  });
  fireEvent.change(contactMethod, { target: { value: '2' } }); //2=Email, 3=Phone, 4=Fax


  fireEvent.input(getSecondaryMemberID(), { target: { value: '56938323' } }); //role is textbox

  
  const patientEmail = screen.getByTestId('patientEmail');//role is textbox means it is an input field
  fireEvent.input(patientEmail, { target: { value: 'muhammadsharjeel819@gmail.com' } });
  

  fireEvent.input(getStreet(), { target: { value: '4567 Anchor Rd' } }); //role is textbox


  fireEvent.input(getCity(), { target: { value: 'United State of America' } }); //role is textbox

  fireEvent.input(getStateProvince(), { target: { value: 'GA' } }); //role is textbox


  fireEvent.input(getPostalCode(), { target: { value: '10250' } }); //role is textbox

  fireEvent.change(getMobilePhone(), { target: { value: '921229212345' } });

    const dropDown = screen.getByTestId('month'); //role is combobox
    fireEvent.change(screen.getByTestId('month'), { target: { value: '03' } });

    const day = screen.getByTestId('day'); //role is combobox
    fireEvent.change(screen.getByTestId('day'), { target: { value: '22' } });

    const year = screen.getByTestId('year');  //role is combobox
    fireEvent.change(screen.getByTestId('year'), { target: { value: '1999' } });

  

    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    // await waitFor(() => expect(onFormSubmit).toHaveBeenCalledWith({ lazy: true }));
    await waitFor(() => expect(onFormSubmit).toHaveBeenCalledTimes(1));
  
});

function getPatientFirstName() {
	return screen.getByRole('textbox', {
		name: /patient's first name \*/i
	});
}

function getEmrid() {
	return screen.getByRole('textbox', {
		name: /emrid \*/i
	});
}

function getPatientLastName() {
	return screen.getByRole('textbox', {
		name: /patient's last name \*/i
	});
}

function getPrimaryMemberID() {
	return screen.getByRole('textbox', {
		name: /primary member id/i
	});
}

function getMobilePhone() {
	return screen.getByRole('textbox', {
		name: /mobile phone/i
	});
}

function getSecondaryMemberID() {
	return screen.getByRole('textbox', {
		name: /secondary member id/i
	});
}

function getStreet() {
	return screen.getByRole('textbox', {
		name: /street 1/i
	});
}

function getCity() {
	return screen.getByRole('textbox', {
		name: /city/i
	});
}

function getStateProvince() {
	return screen.getByRole('textbox', {
		name: /state\/province/i
	});
}

function getPostalCode() {
	return screen.getByRole('textbox', {
		name: /zip\/postal code/i
	});
}


/*
  -------------Steps to follow-------------------
  Error id's = ['firstNameError','emridError','lastNameError'];

i)   Comment the input field and run the below two lines of code. Test should fail and value should be "The filed first name"
ii)  UnComment the input filed and run the below lines. Test should fail and value should be ""
iii) UnComment input field && Test should fail && Data is successfully set (Output is ""). 
iV)  Comment input filed && Test should fail && Data is not successfully set (Output is "The filed first name") 

fireEvent.click(screen.getByRole('button', { name: /create/i }));
await waitFor(() => {
  expect(screen.queryByTestId('firstNameError')?.textContent).toBe('aaaaa');
});

*/


// fireEvent.click(screen.getByRole('button', { name: /create/i }));
// await waitFor(() => {
//   expect(screen.queryByTestId('lastNameError')?.textContent).toBe('aaaaa');
// });