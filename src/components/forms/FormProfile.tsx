"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  username: z.string().min(6).max(50),
  name: z.string().min(8),
  password: z.string().min(8),
  place_origin: z.string().min(6),
  gender: z.string().min(1),
});

const FormProfile = ({ pemagang, user }: { pemagang: any; user: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      name: pemagang?.name,
      password: "",
      place_origin: pemagang?.place_origin,
      gender: pemagang?.gender,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `/api/pemagangs/${pemagang?.id}`,
        values
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      router.refresh();
      setIsLoading(false);
      toast({
        className: "text-green-600 bg-gray-100",
        title: "Sukses",
        description: "Berhasil mengubah profile!",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Username</FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  placeholder="Username..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Nama</FormLabel>
              <FormControl>
                <Input className="text-xs" placeholder="Nama..." {...field} />
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
                  placeholder="Password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="place_origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Asal Institusi</FormLabel>
              <FormControl>
                <Input
                  className="text-xs"
                  placeholder="Asal Institusi"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full lg:w-1/2">
                <FormLabel className="text-xs">Jenis Kelamin</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="text-xs">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="lakilaki">Laki-Laki</SelectItem>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <Button className="w-full" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            proses ..
          </Button>
        ) : (
          <Button type="submit" size="sm" className="w-full">
            Update
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FormProfile;
