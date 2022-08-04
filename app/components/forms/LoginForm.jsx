import { SecondaryButton, Fieldset, Input, PasswordInput, BlueAnchor, CheckboxInput, Label } from '..'
import Link from 'next/link'

export function LoginForm({ className, children, onSubmit, ...props }) {
    return (
        <form
            className={`w-full flex flex-col items-center gap-10 ${className}`}
            {...props}
            onSubmit={onSubmit}>
            <div className="w-full flex flex-col gap-4">
                <Fieldset className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="your email" required />
                </Fieldset>
                <Fieldset className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="password">Password</Label>
                    <PasswordInput type="password" name="password" id="password" placeholder="at least 8 characters" required />
                </Fieldset>
                <div className="w-full flex justify-between items-center">
                    <Fieldset className="flex items-center">
                        <CheckboxInput name="remember" id="remember" value="remember" />
                        <Label className="text-xs text-myblack" htmlFor="remember">Remember Me</Label>
                    </Fieldset>
                    <BlueAnchor>Forgot Password ?</BlueAnchor>
                </div>
            </div>
            <SecondaryButton type="submit">Log in</SecondaryButton>
            <div className="w-full gap-2 flex justify-center">
                <p className="text-myblack text-xs">{"Don't have an account ?"}</p>
                <Link href="/register">
                    <a
                        className={`text-xs text-myblue font-bold ${className}`}>
                        Sign Up
                    </a>
                </Link>
            </div>
        </form>
    )
}