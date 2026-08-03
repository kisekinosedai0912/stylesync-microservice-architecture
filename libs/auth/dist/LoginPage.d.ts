export interface LoginValues {
    email: string;
    password: string;
    remember: boolean;
}
export interface LoginPageProps {
    onSubmit?: (values: LoginValues) => void | Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    forgotPasswordHref?: string;
    signUpHref?: string;
}
export declare function LoginPage({ onSubmit, isSubmitting, error, forgotPasswordHref, signUpHref, }: LoginPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LoginPage.d.ts.map