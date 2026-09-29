"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { brandButton } from "@/components/shared/brand-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/features/auth/components/form-field";
import {
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/schemas/auth.schemas";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const inputClassName = "h-11 rounded-brand-card border-brand-border";

/**
 * The sign up form. Validation is real; submission is not — there is no session and no
 * backend call in this change, and the confirmation says so rather than pretending.
 */
export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit(values: SignUpValues) {
    toast.info("Account creation is not connected yet", {
      description: `Your details validated, ${values.email}. Creating the account needs a backend, which is a separate change.`,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField
        id="fullName"
        label="Full name"
        error={errors.fullName?.message}
      >
        <Input
          id="fullName"
          autoComplete="name"
          className={inputClassName}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          {...register("fullName")}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClassName}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
        hint={errors.password ? undefined : "At least 10 characters."}
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={
            errors.password ? "password-error" : "password-hint"
          }
          {...register("password")}
        />
      </FormField>

      <FormField
        id="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className={inputClassName}
          aria-invalid={errors.confirmPassword ? true : undefined}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          {...register("confirmPassword")}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="terms"
          className="items-start gap-3 leading-snug text-brand-foreground"
        >
          <input
            id="terms"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-brand-accent"
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            {...register("terms")}
          />
          <span>
            I agree to be contacted about my laptop and accept the terms of
            service.
          </span>
        </Label>
        {errors.terms?.message ? (
          <p id="terms-error" className="text-xs font-medium text-red-600">
            {errors.terms.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(brandButton.accent, "w-full")}
      >
        Join Us
      </Button>
    </form>
  );
}
