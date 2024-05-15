import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

interface CustomAutoCompleteProps<T> {
    type: "city" | "district"
    selectedOption: T | null
    options: T[]
    setSelectedOption: React.Dispatch<React.SetStateAction<T | null>>
}

export default function CustomAutoComplete<T>({
    type,
    options,
    selectedOption,
    setSelectedOption
}: CustomAutoCompleteProps<T>) {
    const handleChange = (_: any, value: T | null) => {
        setSelectedOption(value)
    }

    return (
        <Autocomplete
            className="w-full"
            id="country-select-demo"
            options={options}
            autoHighlight
            value={selectedOption}
            onChange={handleChange}
            sx={{
                "& .MuiOutlinedInput-root": {
                    border: "0px solid #d9d9d9",
                    height: "24px",
                    width: "full",
                    fontSize: "12px",
                    zIndex: "10",
                    padding: "0",
                    "&.Mui-focused fieldset": {
                        border: "0px solid #fff"
                    },
                    "MuiAutocomplete-input": {
                        padding: "0"
                    }
                },

                "& .MuiOutlinedInput-root ": {
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "0px solid #fff"
                    }
                },
                "& .MuiInputLabel-root": {
                    display: "block",
                    top: "-8px",
                    fontSize: "12px"
                },
                "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
                    display: "none"
                },
                "& .MuiSvgIcon-root": {
                    display: "none"
                }
            }}
            getOptionLabel={(option: any) => ("province_name" in option ? option.name : option.name || "")}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={`Search ${type}`}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password" // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}
