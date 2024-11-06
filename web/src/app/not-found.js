import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';

export default function NotFoundPage() {
  return (
    <Layout className="justify-start">
      <main className="bg-background min-h-[65vh] grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col text-center">
          <p className="text-white text-base font-semibold">404</p> 
          <h2 className="from-foreground to-muted-foreground mt-4 h-14 bg-gradient-to-r bg-clip-text text-3xl font-semibold tracking-tighter text-transparent sm:text-4xl xl:text-5xl/none text-amber-700">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-7">
            <i>Para quem não sabe onde ir, qualquer caminho serve.</i> - Gato de Cheshire.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Link href="/" aria-label="Go back to the homepage">
              <Button className="bg-red-700/70 dark:bg-red-700/50 dark:hover:bg-red-700 border-red-700 hover:bg-red-700 dark:text-primary flex h-9 flex-row gap-x-1 rounded-full border text-white">
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
