import { ButtonGreen, DivLabelInput, Input, PasswordInput, BlueAnchor, CheckboxInput, Label } from '..'

export function LoginForm({ className, children, onSubmit, ...props }) {
    return (
        <form
            className={`w-full flex flex-col items-center gap-10 ${className}`}
            {...props}
            onSubmit={(event) => {
                event.preventDefault()

                onSubmit(event)
            }}>
            <div className="w-full flex flex-col gap-4">
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="your email" required />
                </DivLabelInput>
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="password">Password</Label>
                    <PasswordInput type="password" name="password" id="password" placeholder="at least 8 characters" required />
                </DivLabelInput>
                <div className="w-full flex justify-between items-center">
                    <DivLabelInput className="flex items-center">
                        <CheckboxInput name="remember" id="remember" value="remember" />
                        <Label className="text-xs text-myblack" htmlFor="remember">Remember Me</Label>
                    </DivLabelInput>
                    <span className="text-xs text-myblue font-bold">Forgot Password ?</span>
                </div>
            </div>
            <ButtonGreen className="p-4" type="submit" active={true}>Log in</ButtonGreen>

        </form>
    )
}