"use client";

import * as z from "zod";
import * as React from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { dateString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  activity: z.string().min(10, {
    message: "logbook minimal berisi 15 kata",
  }),
});

const FormReports = ({ report, status }: { report: any; status: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activity: report?.activity,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      if ("start_date" in report) {
        const response = await axios.put(`/api/reports/weekly/${report?.id}`, {
          status: "Submit",
          activity: data?.activity,
        });
        return response.data;
      } else {
        const response = await axios.put(
          `/api/reports/daily/${report?.id}`,
          data
        );
        return response.data;
      }
    } catch (error) {
      throw error;
    } finally {
      router.refresh();
      setIsLoading(false);
      toast({
        className: "text-green-600 bg-gray-100",
        description: "Berhasil menambah logbook!",
        title: "Sukses",
      });
    }
  }
  return (
    <div className="p-[18px] bg-white rounded-lg shadow-sm flex justify-between items-center w-full lg:w-[calc(50%_-_.75rem)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            disabled={
              status === "Approve" || status === "Submit" ? true : false
            }
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {report?.date ? dateString(report?.date) : "Laporan Mingguan"}
                </FormLabel>
                <FormControl>
                  {report?.activity === "" ? (
                    <Textarea placeholder="tuliskan laporan..." {...field} />
                  ) : (
                    <Textarea placeholder="tuliskan laporan..." {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {status === "Approve" || status === "Submit" ? null : isLoading ? (
            <Button className="w-full" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              proses ..
            </Button>
          ) : (
            <Button type="submit" size="sm" className="w-full">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FormReports;
