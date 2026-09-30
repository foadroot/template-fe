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

/** The frames' field chrome — see `sign-up-form.tsx` for the measurements. */
const inputClassName = cn(
  "h-[52px] rounded-brand-pill border border-brand-neutral-100 bg-white px-6 text-[18px] leading-[28.8px] text-brand-neutral-950 transition-colors",
  "placeholder:text-brand-neutral-400 focus-visible:border-brand-primary focus-visible:ring-1 focus-visible:ring-brand-primary",
  "md:text-[18px]",
);

/** The frames' submit pill (49:239): 46px tall, radius 24, 24px side padding. */
const submitClassName =
  "h-[46px] cursor-pointer rounded-brand-pill bg-brand-accent px-6 text-[18px] leading-[21.6px] font-medium text-brand-neutral-950 transition-[background-color,scale] duration-200 hover:bg-brand-accent-strong active:scale-[0.98] disabled:opacity-75";

/**
 * The log in form: email and password, matching frame 49:220 field for field. Validation
 * is real and runs in the browser; submission is not — there is no backend here, and the
 * confirmation says so rather than implying a session.
 *
 * The frame's field block is the register one minus a row: two groups on a 24px gap with
 * the submit pill right-aligned beneath them.
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
      className="flex w-full flex-col items-end gap-6"
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
        <div className="relative w-full">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="********"
            className={cn(inputClassName, "pr-14")}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {/* Not in the frames — a masked field with no way to check it is not usable.
              It sits inside the control, so it changes no measured box. */}
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-brand-neutral-400 transition-colors hover:text-brand-neutral-700"
          >
            {showPassword ? (
              <EyeOff aria-hidden className="size-5" />
            ) : (
              <Eye aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </FormField>

      <Button type="submit" disabled={isSubmitting} className={submitClassName}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
