// USING CONTEXT TO PROVIDE THEME FEATURE GLOBALLY 

import { createContext } from "react";

export const modes = {
    dark: 'dark',
    light: 'light',
};

export const ModeContext = createContext();
