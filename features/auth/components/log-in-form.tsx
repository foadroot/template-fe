"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/features/auth/components/form-field";
import {
  logInSchema,
  type LogInValues,
} from "@/features/auth/schemas/auth.schemas";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

/** The reference's field chrome: bordered white input, rounded-xl, compact caption type. */
const inputClassName =
  "h-auto rounded-xl border-brand-neutral-200 bg-white px-3.5 py-2 text-xs text-brand-neutral-950 transition-all placeholder:text-brand-neutral-400 focus-visible:border-brand-primary focus-visible:ring-1 focus-visible:ring-brand-primary sm:py-2.5 sm:text-sm";

/** The reference's submit: a small lime pill, right-aligned under the fields. */
const submitClassName =
  "h-8 cursor-pointer rounded-full bg-brand-accent px-7 text-xs font-bold text-brand-primary shadow-sm transition-all hover:bg-brand-accent-strong hover:shadow-md disabled:opacity-75 sm:text-sm";

/**
 * The log in form: email and password, matching the reference screen field for field.
 * Validation is real and runs in the browser; submission is not — there is no backend
 * here, and the confirmation says so rather than implying a session.
 */
export function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "", password: "" },
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
      className="space-y-3 sm:space-y-3.5"
    >
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="designer@example.com"
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className={cn(inputClassName, "pr-10")}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 text-brand-neutral-400 transition-colors hover:text-brand-neutral-700"
          >
            {showPassword ? (
              <EyeOff aria-hidden className="size-4" />
            ) : (
              <Eye aria-hidden className="size-4" />
            )}
          </button>
        </div>
      </FormField>

      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className={submitClassName}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
}
