import { useState } from "react";

interface Toggleable {
    label: string;
    isToggled: boolean;
}


export function useToggler(initToggleables: Toggleable[] = []) {
    const [toggleables, setToggleables] =
        useState<Toggleable[]>(initToggleables);
    
    const toggle = (targetToggleable: string) => {
        setToggleables((toggleables) =>
            toggleables.map((toggleable) =>
                toggleable.label === targetToggleable
                    ? { ...toggleable, isToggled: !toggleable.isToggled }
                    : toggleable
            )
        );
    };
    const open = (targetToggleable: string) => {
        setToggleables((toggleables) =>
            toggleables.map((toggleable) =>
                toggleable.label === targetToggleable
                    ? { ...toggleable, isToggled: true }
                    : toggleable
            )
        );
    };
    const close = (targetToggleable: string) => {
        setToggleables((toggleables) =>
            toggleables.map((toggleable) =>
                toggleable.label === targetToggleable
                    ? { ...toggleable, isToggled: false }
                    : toggleable
            )
        );
    };
    
    const isToggled = (targetToggleable: string) => {
        return toggleables.find(toggleable => toggleable.label === targetToggleable)?.isToggled ?? false
    }
    
    return { isToggled, open, close, toggle }
}
