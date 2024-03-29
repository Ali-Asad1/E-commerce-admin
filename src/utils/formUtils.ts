import { UseFormSetError, ErrorOption } from "react-hook-form";

export type FormErrorType = { name: string } & ErrorOption;
export type FormErrorListType = FormErrorType[];
export type SetErrorsType = (setError: UseFormSetError<any>, errors: FormErrorListType) => void;

export const setErrorsForInputs: SetErrorsType = (setError, errors) => {
  errors.forEach(({ name, type, message }) => {
    setError(name, { type, message });
  });
};
