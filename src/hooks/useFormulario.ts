
import { ChangeEvent, useState } from 'react';


export const useFormulario = <T extends Object> ( initialState : T ) => {
    
    const [formValues, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {

        setValues({
            ...formValues,
            [ target.name ]: target.value
        });

    }

    return { formValues, handleInputChange, reset };

}