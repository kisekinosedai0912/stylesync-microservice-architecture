import { memo } from "react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type FeaturedData = {
    ctaText: string;
    img: string;
    title: string;
    description: string;
};

const featuredData: FeaturedData[] = [
    {
        ctaText: "Book an appointment",
        img: "/hair-treatment.jpg",
        title: "Hair Treatment",
        description:
            "A dedicated hair treatment vitamins & deep root care provided.",
    },
    {
        ctaText: "Book an appointment",
        img: "/coloring.jpg",
        title: "Hair Coloring",
        description:
            "Organic hair color that lasts, does not damage hair & gives a vibrant finish.",
    },
    {
        ctaText: "Book an appointment",
        img: "/foot.jpg",
        title: "Foot Massage",
        description:
            "Foot therapy, massage and care. Gives a relaxing and heaven like feeling.",
    },
];

export default function Services() {
    return (
        <section className="flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-white px-5 pb-20 text-[#433b35] sm:px-8 sm:pb-24 lg:px-16 lg:pb-28">
            <AboutServices />
            <Featured />
        </section>
    );
}

function AboutServices() {
    return (
        <div className="flex w-full max-w-5xl items-center justify-between py-16 text-center sm:py-20 lg:py-24">
            <p className="max-w-2xl font-serif text-[clamp(1.9rem,2.7vw,2.85rem)] font-normal leading-none tracking-[-0.035em] text-[#544940]">
                Our featured{" "}
                <span className="italic text-[#967d69]">services</span>
            </p>
            <p className="max-w-md text-left text-sm font-normal leading-6 text-[#433b35]">
                Each treatment is carefully applied with the desire of producing
                accurate results, in order to satisfy customer expectations.
            </p>
        </div>
    );
}

function Featured() {
    return (
        <section className="grid w-full max-w-5xl gap-8 md:grid-cols-3">
            {featuredData.map((data) => (
                <FeaturedCard key={data.title} data={data} />
            ))}
        </section>
    );
}

const FeaturedCard = memo(function FeaturedCard({
    data,
}: {
    data: FeaturedData;
}) {
    return (
        <Card className="mx-auto w-full max-w-sm pt-0">
            <div className="relative aspect-video overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={data.img}
                    alt="featured services of dahling's spa & salon"
                    loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/20" />
            </div>
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full cursor-pointer">
                    {data.ctaText}
                </Button>
            </CardFooter>
        </Card>
    );
});
