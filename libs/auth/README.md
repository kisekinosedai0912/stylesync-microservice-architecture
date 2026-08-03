# Stylesync auth UI

Shared, presentation-only React authentication pages for the Stylesync web,
admin, and future POS clients. Authentication requests, session storage, and
navigation remain the responsibility of each consuming app.

## Use

Add `@stylesync/auth-ui` as a workspace dependency in the consuming app, import
the package stylesheet once near that app's entry point, and render the page in
the app's own router:

```tsx
import { LoginPage, type LoginValues } from "@stylesync/auth-ui";
import "@stylesync/auth-ui/styles.css";

export function LoginRoute() {
    async function login(values: LoginValues) {
        // Call the consuming app's authentication client here.
    }

    return <LoginPage onSubmit={login} signUpHref="/sign-up" />;
}
```

`LoginPage` and `SignUpPage` accept submit callbacks, loading and error state,
and overridable link destinations. `AuthShell` and `AuthField` are also exported
for app-specific flows that should retain the same visual system.
