// form-sms.jsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  phone: z.string().min(12, {
    message: "Telefone deve ter no mínimo 12 digitos",
  }).max(12, {
    message: 'Telefone deve ter no máximo 12 digitos'
  }),
});

export function Sms() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: data.phone,
          message: "Receba alertas de incêndios do seu estado",
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("SMS enviado com sucesso:", result.messageResponse);
      } else {
        console.error("Erro ao enviar SMS:", result.error);
      }
    } catch (error) {
      console.error("Erro ao enviar SMS:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avise-me por SMS</FormLabel>
              <FormControl>
                <Input placeholder="+(xx)xxxxxxxxx" {...field} />
              </FormControl>
              <FormDescription>
                Receba alertas de incêndios do seu estado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
