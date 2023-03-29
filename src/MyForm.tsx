// src/components/MyForm.tsx
import React, { useState } from "react";
import { ValidationError } from "yup";
import validationSchema from "./validationSchema";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const MyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setSuccess(true);
    } catch (error: any) {
      const errors = error as ValidationError;

      const formattedErrors = errors.inner.reduce(
        (accumulatorObj: any, currentObj: any) => {
          accumulatorObj[currentObj.path] = currentObj.message;
          return accumulatorObj;
        },
        {}
      );
      setSuccess(false);
      console.log("the errors", formattedErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
        {success && <p>Success!</p>}
    </form>
  );
};

export default MyForm;
