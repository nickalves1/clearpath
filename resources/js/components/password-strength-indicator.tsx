import { Check, X } from 'lucide-react';

export type Requirement = {
    label: string;
    met: boolean;
};

export function getPasswordRequirements(password: string): Requirement[] {
    return [
        { label: 'At least 12 characters', met: password.length >= 12 },
        { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'One lowercase letter', met: /[a-z]/.test(password) },
        { label: 'One number', met: /[0-9]/.test(password) },
        { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
    ];
}

type Props = {
    password: string;
};

export function PasswordStrengthIndicator({ password }: Props) {
    const requirements = getPasswordRequirements(password);

    return (
        <>
            {requirements.map((requirement) => (
                <div
                    key={requirement.label}
                    className="flex flex-row items-center pl-5 pt-1"
                >
                    {requirement.met ? (
                        <Check color="green" size={12} />
                    ) : (
                        <X color="red" size={12} />
                    )}
                    <p className="text-sm pl-1 text-gray-700/60">
                        {requirement.label}
                    </p>
                </div>
            ))}
        </>
    );
}
