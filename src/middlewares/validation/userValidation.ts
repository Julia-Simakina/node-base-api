import * as yup from "yup";
import { validateData } from ".";

const updateUserDataSchema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email(),
  dob: yup
    .date()
    .min(new Date(1900, 0, 1))
    .max(new Date().toISOString().split("T")[0]),
});

const updateUserDataValidation = validateData(updateUserDataSchema);

export { updateUserDataValidation };
