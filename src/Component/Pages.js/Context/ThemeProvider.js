import React, { createContext, useState } from 'react';
export const ThemeContext = createContext()
const ThemeProvider = ({children}) => {
    const [mode, setMode] = useState("light");
    const contextInfo= {mode}
    return (
        <ThemeContext.Provider value={contextInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;