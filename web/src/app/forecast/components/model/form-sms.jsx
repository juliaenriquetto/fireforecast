"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { ComboboxDemo } from "@/components/ui/combobox";

const formSchema = z.object({
  phone: z.string().min(14, {
    message: "Telefone deve ter no mínimo 14 digitos",
  }).max(14, {
    message: 'Telefone deve ter no máximo 14 digitos'
  }),
});

export function Sms({ selectedCity }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data, event) => {
    event.preventDefault()

    try {
        const response = await fetch("/api/send-sms", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: data.phone,
          message: `Alerta de queimada!! Há uma chance de [X]% de ocorrência de queimadas em ${selectedCity} nos próximos dias. Fique atento e evite qualquer atividade que possa provocar incêndios. Se necessário, entre em contato com as autoridades locais para mais orientações e mantenha-se seguro.`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("SMS enviado com sucesso", result.messageResponse);
      } else {
        alert("Erro ao enviar SMS", result.error);
      }
    } catch (error) {
      alert("Erro ao enviar SMS", error);
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
                <Input placeholder="+55(xx)xxxxxxxxx" {...field} />
              </FormControl>
              <FormDescription>
                Receba alertas de incêndios do seu estado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!selectedCity}>Enviar</Button>
      </form>
    </Form>
  );
}
