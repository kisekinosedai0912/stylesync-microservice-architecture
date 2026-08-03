import type { InputHTMLAttributes } from "react";
export interface AuthFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    label: string;
    hint?: string;
}
export declare function AuthField({ label, hint, id, name, ...props }: AuthFieldProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AuthField.d.ts.map