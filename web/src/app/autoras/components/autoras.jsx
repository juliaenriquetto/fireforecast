import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaLink } from 'react-icons/fa6';

import Layout from '@/components/layout';

export const dynamic = 'force-static';

const authors = [
    {
        name: 'Clara Andrade Santanna Santos', 
        email: 'clara.andrade.ssantos@gmail.com',
        picture: '/autoras/clara.png', 
        bio: (
            <>
                Técnica em informática - Colégio Técnico de Campinas - Unicamp
            </>
        ), 
        linkedin: 'https://www.linkedin.com/in/claraandradee/',
        github: 'https://github.com/claraandradee'
    },
    {
        name: 'Julia Enriquetto de Brito', 
        email: 'juliaenriquettodebrito@gmail.com',
        picture: '/autoras/julia.png', 
        bio: (
            <>
                Técnica em informática - Colégio Técnico de Campinas - Unicamp
            </>
        ), 
        linkedin: 'https://www.linkedin.com/in/juliaenriquetto/',
        github: 'https://github.com/juliaenriquetto'
    },
];

export default function Authors() {
    return (
        <Layout className="h-full w-full justify-start">
            <div className="flex min-h-[65vh] w-full items-start justify-center py-10">
                <main className="relative flex w-full flex-col items-center justify-center gap-y-10 text-lg font-normal tracking-tighter md:w-4/5 md:justify-between">
                    <div className="flex flex-col items-center justify-start gap-y-10 sm:gap-y-20">
                        <div className="flex h-full w-full flex-col items-center justify-start gap-y-1 px-8 md:max-w-lg lg:max-w-2xl">
                            <article className="flex w-full flex-col items-start gap-y-14 pb-10 md:w-[40rem] lg:w-[50rem]">
                                <div className="flex flex-col gap-y-2">
                                    <h2 className="text-2xl font-semibold tracking-tighter sm:text-3xl xl:text-4xl bg-gradient-to-r from-[hsl(0,85%,50%)] to-[hsl(30,100%,50%)] bg-clip-text text-transparent">
                                    Autoras
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-x-8 gap-y-6 lg:flex-row">
                                    {authors.map((author, i) => (
                                        <div className="flex flex-col items-center gap-y-2" key={`author-${i}`}>
                                            <Image
                                                 src={author.picture}
                                                 alt={`Picture of ${author.name}`}
                                                 width={200}
                                                 height={200}
                                                 className="rounded-full"
                                            />
                                            <div className="flex flex-col items-center gap-y-2">
                                            <h1 className="text-base font-medium tracking-tighter md:text-lg lg:text-xl">
                                                {author.name}
                                            </h1>
                                            <div className="text-muted-foreground flex flex-row items-center gap-x-2">
                                                <Link
                                                    href={author.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:text-primary transition-colors duration-200"
                                                >
                                                    <FaLinkedin className="text-2xl" />
                                                </Link>
                                                <Link
                                                    href={author.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:text-primary transition-colors duration-200"
                                                >
                                                    <FaGithub className="text-2xl" />
                                                </Link>
                                                <Link
                                                    href={`mailto:${author.email}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:text-primary transition-colors duration-200"
                                                >
                                                    <FaLink className="text-2xl" />
                                                </Link>
                                            </div>
                                            <div className="text-muted-foreground text-center text-sm tracking-normal md:text-base">
                                                {author.bio}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </article>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}