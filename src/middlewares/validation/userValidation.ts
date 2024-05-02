import * as yup from "yup";
import { validateData } from ".";

const updateUserDataSchema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(5),
  dayOfBirth: yup.date().min(new Date(1900, 0, 1)).max(new Date()),
});

const updateUserDataValidation = validateData(updateUserDataSchema);

export { updateUserDataValidation };
