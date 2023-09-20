import { Box, TextField } from "@mui/material";
import { Field } from "react-final-form";

interface CustomTextFieldProps {
    name: string
    label?: string
    textBoxFullWidth? : boolean
    isMultiline?: boolean
    rows? : string | number
    type? : string
}

const CustomTextField = (props : CustomTextFieldProps) => {
    const { name, label, textBoxFullWidth, isMultiline, rows, type} = props;

  return (
    <>
    <label style={{fontWeight: "bold"}}>{label}</label>
    <Field name={name}>
      {(props) => (
        <div>
          <TextField
            name={props.input.name}
            type={type || 'text'}
            value={props.input.value}
            onChange={props.input.onChange}
            fullWidth ={textBoxFullWidth}
            multiline ={isMultiline}
            rows={rows}
            inputProps={{
                style: {
                  height: isMultiline ? "50px" : "8px",
                },
              }}
          />
          <Box>
          {props.meta.touched && props.meta.error && <span className="errorfield">{props.meta.error}</span>}
          </Box>
          
        </div>
      )}
    </Field>
    </>
    
  );
};

export default CustomTextField;
