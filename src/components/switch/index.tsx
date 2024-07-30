import { useEffect } from 'react';
import './style.scss';
import { useTheme } from "@/hooks/useTheme";

export const Switch = () => {

    const {theme, setTheme}= useTheme();

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <div className="container-switch">
            <span>Change Theme </span>
            <label className="switch">
                <input type="checkbox" onChange={()=>setTheme(theme === 'light'?'dark': 'light')} checked={theme === 'dark'}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}


export default Switch;
