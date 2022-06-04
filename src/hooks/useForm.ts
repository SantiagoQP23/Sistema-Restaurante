import { ChangeEvent, FC, FocusEvent, MouseEvent, useState } from 'react';



export const useForm = (initialForm: {}, validateForm: (form: {}, objectInitial: {}) => {}) => {

  const objectInitial = initialForm;
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<boolean | null>(null);


  // Escucha un cambio en el input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    setResponse(false);

  };



  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    handleChange(e);

    setErrors(validateForm(form, objectInitial));


  };





   const handleSubmit = async (funcionSubmit: (form: {}) => boolean ) => {

    setErrors(validateForm(form, objectInitial));

    if (Object.keys(errors).length === 0) {
      setLoading(true)

      let response = await funcionSubmit(form)

      setLoading(!response)
      setResponse(!response);

      if(!response){
        setLoading(false)
      }


    } else {

      return;

    }
  };


  return {
    form, errors, loading, response, handleChange, handleBlur, handleSubmit

  }
}
