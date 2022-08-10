import { ButtonGreen, DivLabelInput, Input, PasswordInput, Label, CheckboxInput } from '..'

export function RegisterForm({ className, onSubmit }) {
    return (
        <form
            className={`w-full flex flex-col items-around gap-5 ${className || ''}`}
            onSubmit={(event) => {
                event.preventDefault()

                onSubmit(event)
            }}
        >

            <div className="w-full flex flex-col items-start gap-4">
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="username">Username</Label>
                    <Input type="text" name="username" id="username" placeholder="username" required />
                </DivLabelInput>
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="your email" required />
                </DivLabelInput>
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="password">Password</Label>
                    <PasswordInput type="password" name="password" id="password" placeholder="at least 8 characters" required />
                </DivLabelInput>
                <DivLabelInput className="w-full flex flex-col">
                    <Label className="font-medium" htmlFor="repeatPassword">Repeat Password</Label>
                    <PasswordInput type="password" name="repeatPassword" id="repeatPassword" placeholder="at least 8 characters" required />
                </DivLabelInput>
                <DivLabelInput className="flex items-center">
                    <CheckboxInput name="agreeTermsAndPrivacy" id="agreeTermsAndPrivacy" value="agreeTermsAndPrivacy" />
                    <Label htmlFor="agreeTermsAndPrivacy">
                        <p className="text-xs text-myblack" >
                            I agree with
                            <span className="text-xs text-myblue font-bold"> Terms </span>
                            and
                            <span className="text-xs text-myblue font-bold"> Privacy</span>
                        </p>
                    </Label>
                </DivLabelInput>
            </div>

            <ButtonGreen className="p-4" type="submit" active={true}>Sign Up</ButtonGreen>

        </form>
    )
}