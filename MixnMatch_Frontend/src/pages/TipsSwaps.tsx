import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TipsSwaps = () => {
  const tips = [
    {
      question: "What can I substitute for buttermilk?",
      answer: "Mix 1 cup of milk with 1 tablespoon of lemon juice or vinegar. Let it sit for 5 minutes before using.",
    },
    {
      question: "How do I know when my oil is hot enough?",
      answer: "Drop a small piece of bread into the oil. If it sizzles and turns golden in about 60 seconds, the oil is ready.",
    },
    {
      question: "What's a good egg substitute for baking?",
      answer: "Try 1/4 cup of applesauce, mashed banana, or 1 tablespoon of ground flaxseed mixed with 3 tablespoons of water per egg.",
    },
    {
      question: "How can I make my vegetables last longer?",
      answer: "Store leafy greens with a paper towel in a sealed container. Keep tomatoes at room temperature until ripe, then refrigerate.",
    },
    {
      question: "What's the best way to season cast iron?",
      answer: "Clean thoroughly, dry completely, apply thin layer of oil, bake upside down at 450°F for 1 hour. Repeat 2-3 times.",
    },
    {
      question: "Can I substitute dried herbs for fresh?",
      answer: "Yes! Use 1/3 the amount of dried herbs as you would fresh, since dried herbs are more concentrated.",
    },
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tips & Swaps</h1>
        <p className="text-muted-foreground">Cooking knowledge base and ingredient substitutions</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tips and substitutions..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Common Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {tips.map((tip, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{tip.question}</AccordionTrigger>
                <AccordionContent>{tip.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipsSwaps;
