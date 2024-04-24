import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { TextField } from '@mui/material';

export enum BasicFormControlType {
  text = 'text',
  number = 'number'
}

interface BasicFormControlProps {
  require?: boolean
  label: string | ""
  type?: BasicFormControlType
  placeholder?: string | 'Write your some thing here'
  errorMessage?: string
  onChange?: (value: any) => void
  value?: any
  className?: string
}

interface NumberInputControlProps {
  require?: boolean
  label: string | ""
  placeholder?: string | 'Write your some thing here'
  errorMessage?: string
  onChange?: (value: any) => void
  value?: any
  className?: string
}

export const BasicFormControl = (props: BasicFormControlProps) => {
  return (
    <FormControl
      defaultValue=""
      required={props.require}
      onChange={props.onChange}
      value={props.value}
      className={props.className}>
      <Label>{props.label}</Label>
      <StyledInput placeholder={props.placeholder} />
      <HelperText />
    </FormControl>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

export const Label = styled(
  ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
      </p>
    );
  },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;
  font-weight:700;

  &.invalid {
    color: red;
  }
`;

interface HelperTextProps {
  errorMessage?: string
}
const HelperText = styled((props: HelperTextProps) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p>{props.errorMessage}</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const BasicInputNumberControl = (props: BasicFormControlProps) => {
  return (
    <div>
      <Label className="mt-2 mb-2"> Số lượng</Label>
      <TextField required={true}
        type='number'
        label='Test'
        style={{ 'width': '320px' }}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        >
          
        </TextField>
    </div>
  );
}

