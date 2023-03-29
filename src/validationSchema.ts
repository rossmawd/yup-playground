// src/validation/MyFormValidation.ts
import * as Yup from 'yup';

const MyFormValidation = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be at most 50 characters long')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be at most 50 characters long')
    .required('Last name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default MyFormValidation;


