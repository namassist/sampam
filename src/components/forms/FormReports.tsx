"use client";

import * as z from "zod";
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

const FormSchema = z.object({
  activity: z.string().min(10, {
    message: "logbook minimal berisi 15 kata",
  }),
});

const FormReports = ({ report, status }: { report: any; status: string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      activity: report?.activity,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.put(
        `/api/reports/daily/${report?.id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      window.location.reload();
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
            disabled={status === "Approve" ? true : false}
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dateString(report?.date)}</FormLabel>
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
          {status === "Approve" ? null : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
};

export default FormReports;
