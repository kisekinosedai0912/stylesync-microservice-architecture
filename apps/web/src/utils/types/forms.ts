import type { FormEvent } from "react";

export type FormType = {
    formState: boolean;
    submitFunc: (event: FormEvent<HTMLFormElement>) => void;
};
