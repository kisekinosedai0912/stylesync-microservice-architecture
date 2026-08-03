export interface SignUpValues {
    fullName: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
}
export interface SignUpPageProps {
    onSubmit?: (values: SignUpValues) => void | Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    loginHref?: string;
    termsHref?: string;
    privacyHref?: string;
}
export declare function SignUpPage({ onSubmit, isSubmitting, error, loginHref, termsHref, privacyHref, }: SignUpPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SignUpPage.d.ts.map