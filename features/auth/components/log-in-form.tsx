"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { brandButton } from "@/components/shared/brand-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField } from "@/features/auth/components/form-field";
import {
  logInSchema,
  type LogInValues,
} from "@/features/auth/schemas/auth.schemas";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const inputClassName = "h-11 rounded-brand-card border-brand-border";

/**
 * The log in form. Validation is real; submission is not (see SignUpForm).
 */
export function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  function onSubmit(values: LogInValues) {
    toast.info("Sign in is not connected yet", {
      description: `Your details validated, ${values.email}. Sessions need a backend, which is a separate change.`,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
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
      >
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          className={inputClassName}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>

      <Label htmlFor="rememberMe" className="gap-3 text-brand-muted-foreground">
        <input
          id="rememberMe"
          type="checkbox"
          className="size-4 shrink-0 accent-brand-accent"
          {...register("rememberMe")}
        />
        <span>Keep me signed in on this device</span>
      </Label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(brandButton.accent, "w-full")}
      >
        Sign In
      </Button>
    </form>
  );
}
