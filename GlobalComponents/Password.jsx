import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, name, value, onChange, error, helperText, fullWidth = true }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth={fullWidth}
            margin="normal"
            name={name}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            value={value}
            error={error}
            helperText={helperText}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
