import type { InputHTMLAttributes } from "react";

export interface AuthFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    label: string;
    hint?: string;
}

export function AuthField({ label, hint, id, name, ...props }: AuthFieldProps) {
    const fieldId = id ?? name;
    const hintId = hint && fieldId ? `${fieldId}-hint` : undefined;

    return (
        <label className="ss-auth__field" htmlFor={fieldId}>
            <span>{label}</span>
            <input
                {...props}
                id={fieldId}
                name={name}
                aria-describedby={hintId}
            />
            {hint ? (
                <small id={hintId} className="ss-auth__hint">
                    {hint}
                </small>
            ) : null}
        </label>
    );
}
