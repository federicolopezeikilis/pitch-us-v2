import { Fieldset, Input, Label } from '../../components'

export function EditProfileForm({ className, children, user, ...props }) {
    return (
        <form className={`w-full flex flex-col items-around gap-6 ${className}`} {...props}>
            <div className="flex flex-col gap-4">
            <Fieldset className="w-full flex flex-col">
                <Label className="font-medium" htmlFor="firstName">Name</Label>
                <Input type="text" name="firstName" id="firstName" defaultValue={user.firstName || ""} required />
            </Fieldset>
            <Fieldset className="w-full flex flex-col">
                <Label className="font-medium" htmlFor="lastName">Last name</Label>
                <Input type="text" name="lastName" id="lastName" defaultValue={user.lastName || ""} required />
            </Fieldset>
            <Fieldset className="w-full flex flex-col">
                <Label className="font-medium" htmlFor="dateOfBirth">Birth Date</Label>
                <Input type="date" name="dateOfBirth" id="dateOfBirth" defaultValue={user.dateOfBirth && user.dateOfBirth.slice(0, 10) || ""} required />
            </Fieldset>
            </div>
            <button className="w-full py-4 rounded-full bg-mygreen flex items-center justify-center text-white font-medium" type="submit">Save</button>
        </form>
    )
}