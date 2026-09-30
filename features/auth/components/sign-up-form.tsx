"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/features/auth/components/form-field";
import {
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/schemas/auth.schemas";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

/**
 * The frames' field chrome (47:371): a 52px white control, a 1px INSIDE stroke in
 * Neutral 100, 24px side padding and Satoshi 400 at 18px. The frame draws no focus
 * state, so the primary focus ring here is an addition — a control with no visible focus
 * indicator cannot be used from the keyboard.
 *
 * **Deviation:** the frame gives the control radius 12, but main rounds every search and
 * newsletter field on the site to the brand pill, and these two were the last rectangles
 * left. The capsule wins so auth is not the odd field out; everything else is the
 * frame's own.
 *
 * The `md:` copy of the size is not decoration: `Input`'s own base sets `text-base` and
 * then `md:text-sm`, and a responsive variant out-ranks a plain one in the cascade, so
 * without it the control would drop to 14px on tablet.
 */
const inputClassName = cn(
  "h-[52px] rounded-brand-pill border border-brand-neutral-100 bg-white px-6 text-[18px] leading-[28.8px] text-brand-neutral-950 transition-colors",
  "placeholder:text-brand-neutral-400 focus-visible:border-brand-primary focus-visible:ring-1 focus-visible:ring-brand-primary",
  "md:text-[18px]",
);

/**
 * The frames' submit (47:381): a lime pill 46px tall, radius 24, 24px side padding and
 * Satoshi Medium 18 with a 21.6px line box, in Neutral 950. HUG width, so the pill is
 * exactly its label plus 48 — 123px for "Continue", 104px for "Sign In".
 */
const submitClassName =
  "h-[46px] cursor-pointer rounded-brand-pill bg-brand-accent px-6 text-[18px] leading-[21.6px] font-medium text-brand-neutral-950 transition-[background-color,scale] duration-200 hover:bg-brand-accent-strong active:scale-[0.98] disabled:opacity-75";

/**
 * The sign up form: full name, email and password, matching frame 47:362 field for
 * field — the frame has no password confirmation and no terms checkbox, so neither does
 * this. Validation is real and runs in the browser; submission is not — there is no
 * backend here, and the confirmation says so rather than implying an account exists.
 *
 * The form is the field stack: a right-aligned column on a 24px gap, which is what puts
 * the submit pill under the fields' right edge.
 */
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "" },
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
      className="flex w-full flex-col items-end gap-6"
    >
      <FormField
        id="fullName"
        label="Full Name"
        error={errors.fullName?.message}
      >
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jamie Davis"
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
            autoComplete="new-password"
            placeholder="********"
            className={cn(inputClassName, "pr-14")}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {/* The frames draw a plain control with no reveal affordance; this stays
              because a masked field with no way to check it is not usable. It sits
              inside the control, so it changes no measured box. */}
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
        {isSubmitting ? "Creating..." : "Continue"}
      </Button>
    </form>
  );
}
