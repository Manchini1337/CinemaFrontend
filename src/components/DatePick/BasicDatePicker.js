import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function BasicDatePicker({ onChange, value }) {
  const color = '#fff';
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label='Wybierz datę'
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              svg: { color },
              input: { color },
              label: { color },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
