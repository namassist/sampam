"use client";

import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const signInData = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      signInData?.error
        ? toast({
            className: "text-red-600",
            title: `Error ${signInData?.status}`,
            description: `${signInData?.error}`,
          })
        : null;
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      console.log(error);
    } finally {
      router.refresh();
      const session = await getSession();
      session?.user?.role === "admin"
        ? router.push("/admin/dashboard")
        : router.push("/dashboard");
      setIsLoading(false);

      if (session) {
        toast({
          className: "text-green-600",
          title: `Login Berhasil`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-3/12">
        <Image
          className="absolute -top-16 -right-16"
          src="/ornamen1.png"
          style={{ zIndex: "-9999" }}
          width={147}
          height={262}
          alt="image"
        />
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold text-gray-500 text-center mt-3 mb-8 uppercase">
            SAMPAM APP
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="Masukkan username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-xs"
                        placeholder="Masukkan password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button className="w-full" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Sedang Login ..
                </Button>
              ) : (
                <Button type="submit" size="sm" className="w-full">
                  Masuk
                </Button>
              )}
            </form>
          </Form>
          <p className="text-xs text-gray-500 text-center mt-10 capitalize">
            &copy;2024 | Build by sampam team
          </p>
        </div>
        <Image
          src="/ornamen2.png"
          className="absolute -bottom-14 -left-20"
          width={147}
          height={262}
          alt="image"
          style={{ zIndex: "-9999" }}
        />
      </div>
    </div>
  );
}
