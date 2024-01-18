"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { dateString, dateMonth } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  CheckCheck,
  Hourglass,
  Check,
  ShieldAlert,
  AlertTriangle,
  MegaphoneOff,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Breadcrumbs from "@/components/breadcrumbs";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  information: z
    .string()
    .min(15, {
      message: "message must be at least 10 characters.",
    })
    .max(160, {
      message: "message must not be longer than 30 characters.",
    }),
});

interface Logbook {
  id: string;
  name: string;
  place_origin: string;
  reports: Report[];
}

interface Report {
  id: string;
  status: string;
  start_date: Date;
  end_date: Date;
  week: string;
  activity: string;
  daily: Daily[];
}

interface Daily {
  id: string;
  date: Date;
  activity: string;
}

export default function Page() {
  const { toast } = useToast();
  const pathname = usePathname().split("/");
  const userId = pathname[pathname.length - 1];
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [logbook, setLogbook] = useState<Logbook | undefined>(undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      information: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      if (currentId) {
        const response = await axios.put(`/api/reports/weekly/${currentId}`, {
          status: "Revisi",
          information: values?.information,
        });
        return response.data;
      }
    } catch (error) {
      throw error;
    } finally {
      toast({
        className: "text-green-600 bg-gray-100",
        title: "Sukses",
        description: "Berhasil merevisi Logbook",
      });
      window.location.reload();
    }
  }

  useEffect(() => {
    getLogbook(userId);
  }, [userId]);

  async function getLogbook(id: string) {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/reports/${id}`);

      if (response.status === 200) {
        setLogbook(response?.data?.data);
      }
    } catch (error) {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  }

  const badgeStatus = (status: string) => {
    let color;
    let message;
    let icon;

    switch (status) {
      case "Submit":
        color = "text-blue-500";
        message = "Menunggu Persetujuan";
        icon = <Hourglass className="w-4 h-4" />;
        break;
      case "Revisi":
        color = "text-yellow-500";
        message = "Direvisi";
        icon = <AlertTriangle className="w-4 h-4" />;
        break;
      case "Approve":
        color = "text-green-500";
        message = "Disetujui";
        icon = <CheckCheck className="w-4 h-4" />;
        break;
      default:
        color = "text-slate-500";
        message = "belum Dimulai";
        icon = <MegaphoneOff className="w-4 h-4" />;
        break;
    }
    return (
      <p className={`flex items-center font-medium gap-1 capitalize ${color}`}>
        {icon}
        {message}
      </p>
    );
  };

  async function handleUpdate(id: string, data: any) {
    try {
      const response = await axios.put(`/api/reports/weekly/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      toast({
        className: "text-green-600 bg-gray-100",
        title: "Sukses",
        description: "Berhasil menyetujui Logbook",
      });
      window.location.reload();
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Logbook {logbook?.name}</h1>
        <Breadcrumbs role="Admin" currentPage="Logbook" />
      </div>
      <div className="bg-white rounded-lg p-[18px] space-y-4">
        {logbook?.reports?.map((report) => (
          <Accordion
            key={report?.id}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="text-sm space-y-2">
                  {badgeStatus(report?.status)}
                  <p className="flex items-center font-semibold">
                    {dateMonth(report?.start_date)} -{" "}
                    {dateMonth(report?.end_date)}
                  </p>
                  <p className="flex text-gray-500">{report?.week}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {report?.daily?.map((r) => (
                    <div key={r?.id} className="space-y-2">
                      <h4 className="text-gray-700">{dateString(r.date)}</h4>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {r?.activity === "" ? "belum ada logbook" : r?.activity}
                      </p>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <h4 className="text-gray-700">Laporan Mingguan</h4>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {report?.activity === ""
                        ? "belum ada logbook"
                        : report?.activity}
                    </p>
                  </div>
                  {report?.status !== "Approve" && report?.activity !== "" ? (
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            onClick={() => setCurrentId(report?.id)}
                          >
                            <ShieldAlert className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Revisi Logbook</DialogTitle>
                          </DialogHeader>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="w-full space-y-6"
                            >
                              <FormField
                                control={form.control}
                                name="information"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Pesan Revisi</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Berikan catatan revisi"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit">Kirim</Button>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={() =>
                          handleUpdate(report?.id, { status: "Approve" })
                        }
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : null}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </AuthLayout>
  );
}
