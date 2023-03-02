import { TextFieldProps } from "./text-field.props";
import { ErrorMessage, useField } from "formik";
import { FieldHookConfig } from "formik/dist/Field";

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="inline-block w-full">
      <label
        htmlFor="email"
        className={`inline-block w-full ${
          meta.touched && meta.error && "border-red-500 border-2"
        }`}>
        <input {...props} {...field} className="input w-full" />
      </label>
      <p className="text-red-500">
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TextField;
