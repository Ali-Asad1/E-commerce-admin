import { UseFormSetError, ErrorOption } from "react-hook-form";

type FormErrorType = { name: string } & ErrorOption;
type FormErrorListType = FormErrorType[];
type SetErrorsType = (setError: UseFormSetError<any>, errors: FormErrorListType) => void;

export const setErrorsForInputs: SetErrorsType = (setError, errors) => {
  errors.forEach(({ name, type, message }) => {
    setError(name, { type, message });
  });
};
