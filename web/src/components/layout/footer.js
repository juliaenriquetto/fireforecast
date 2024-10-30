'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useWindowSize } from 'react-use';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import FireforecastHeading from '@/components/fireforecast-heading';
import { FaGithub } from 'react-icons/fa6';
