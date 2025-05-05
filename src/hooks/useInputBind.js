export const useInputBind = (value, setValue) => {

    const bindInput = {
        value: value.query,
        onChange: (e) => setValue((prev) => ({
            ...prev,
            query: e.target.value,
        }))
    }

    return [bindInput]
}