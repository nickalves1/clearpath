import { Form, Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import {
    getPasswordRequirements,
    PasswordStrengthIndicator,
} from '@/components/password-strength-indicator';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    const isPasswordValid = getPasswordRequirements(password).every(
        (requirement) => requirement.met,
    );
    const passwordsMatch =
        passwordConfirmation.length > 0 && passwordConfirmation === password;

    const passwordBorderClass =
        password.length === 0
            ? ''
            : isPasswordValid
              ? 'border-green-500 focus-visible:border-green-500'
              : 'border-red-500 focus-visible:border-red-500';

    const passwordConfirmationBorderClass =
        passwordConfirmation.length === 0
            ? ''
            : passwordsMatch
              ? 'border-green-500 focus-visible:border-green-500'
              : 'border-red-500 focus-visible:border-red-500';

    function handleCreateAccountClick(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        if (!isPasswordValid) {
            event.preventDefault();
            passwordRef.current?.focus();

            return;
        }

        if (!passwordsMatch) {
            event.preventDefault();
            passwordConfirmationRef.current?.focus();
        }
    }

    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="company_name">
                                    Company name
                                </Label>
                                <Input
                                    id="company_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="organization"
                                    name="company_name"
                                    placeholder="Company name"
                                />
                                <InputError
                                    message={errors.company_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    ref={passwordRef}
                                    value={password}
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    className={passwordBorderClass}
                                />
                                <InputError message={errors.password} />
                                {password.length > 0 && (
                                    <PasswordStrengthIndicator
                                        password={password}
                                    />
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    ref={passwordConfirmationRef}
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className={passwordConfirmationBorderClass}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={6}
                                data-test="register-user-button"
                                onClick={handleCreateAccountClick}
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={7}>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
