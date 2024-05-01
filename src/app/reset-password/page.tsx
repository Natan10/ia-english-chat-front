"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/clients/supabase-browser-client";
import tutorAi from "@/assets/tutor.png";

const schemeValidationResetPassword = z.object({
  email: z
    .string({
      message: "Please provide a valid email",
    })
    .email({
      message: "Please provide a valid email",
    }),
});

type FormDataType = z.infer<typeof schemeValidationResetPassword>;

export default function ResetPasswordEmail() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schemeValidationResetPassword),
  });
  const client = createClient();

  async function handleResetPasswordEmail(data: FormDataType) {
    try {
      const response = await client.auth.resetPasswordForEmail(data.email, {
        redirectTo: "/reset-password-credentials",
      });

      if (response.error) {
        toast.error(response.error.message);
        return;
      }
      redirect("signin");
    } catch (err) {
      toast.error("Error on Reset password, try again!");
    }
  }

  return (
    <section className="h-screen max-h-screen w-full overflow-hidden">
      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-900 hidden md:block"></div>
        <div className="w-full max-w-md mx-auto flex items-center justify-center">
          <div className="w-full">
            <div className="flex items-center gap-3">
              <Image src={tutorAi} height={60} width={60} alt="english tutor" />
              <h1 className="font-medium text-xl text-gray-950">
                AI Tutor Login
              </h1>
            </div>
            <div className="mt-6">
              <form onSubmit={handleSubmit(handleResetPasswordEmail)}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      id="email"
                      placeholder="jhondoe@email.com"
                      {...register("email")}
                    />
                    <span className="text-xs text-red-600">
                      {errors && errors.email && errors.email.message}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-center gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    Reset Password
                  </Button>
                  <Link
                    href="signin"
                    className="cursor-pointer hover:underline"
                  >
                    <p className="text-muted-foreground text-sm">Sign in</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
