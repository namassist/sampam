"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Separator } from "@/components/ui/separator";
import { Check, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  message: z
    .string()
    .min(10, {
      message: "message must be at least 10 characters.",
    })
    .max(160, {
      message: "message must not be longer than 30 characters.",
    }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Logbook User A</h1>
      </div>
      <div className="bg-white rounded-lg p-[18px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Minggu 1</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-gray-700">Senin, 24 Januari 2024</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae!
                  </p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <h4 className="text-gray-700">Senin, 24 Januari 2024</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae!
                  </p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <h4 className="text-gray-700">Senin, 24 Januari 2024</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae!
                  </p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <h4 className="text-gray-700">Senin, 24 Januari 2024</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae!
                  </p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <h4 className="text-gray-700">Senin, 24 Januari 2024</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae!
                  </p>
                  <Separator />
                </div>
                <div className="space-y-2">
                  <h4 className="text-gray-700">Laporan Mingguan</h4>
                  <p className="text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Esse possimus autem labore sed, fugiat corrupti accusantium,
                    libero maxime doloremque corporis repellendus alias eaque
                    eos amet fugit numquam. Similique quod esse iste minima
                    recusandae laudantium quis architecto, fugit id atque
                    molestiae sint hic quia, voluptas optio, distinctio
                    repellendus debitis soluta beatae! Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Est quae aperiam rerum
                    eius ratione magni officiis quas cum minima placeat ipsum
                    illo, atque ullam iusto! Consequuntur minus ad animi dolorem
                    architecto vel minima, sequi vitae facere numquam vero
                    magnam doloremque nesciunt obcaecati fugit consectetur ab
                    deserunt? Iure a est incidunt!
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
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
                            name="message"
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
                  <Button>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AuthLayout>
  );
}
