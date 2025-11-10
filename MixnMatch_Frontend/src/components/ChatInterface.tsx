import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, RotateCcw, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  recipe?: {
    title: string;
    ingredients: string[];
    steps: string[];
  };
}

interface ChatInterfaceProps {
  previewMode?: boolean;
  messages?: Message[];
}

export const ChatInterface = ({ previewMode = false, messages: initialMessages }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const quickChips = [
    { label: "Breakfast", value: "breakfast" },
    { label: "< 20 min", value: "quick" },
    { label: "Vegan", value: "vegan" },
    { label: "Gluten-Free", value: "glutenfree" },
  ];

  const quickReplies = [
    "Make it spicier",
    "Make it vegan",
    "Shorten cook time",
    "Add more protein",
  ];

  const handleSend = async () => {
    if (!input.trim() || previewMode) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "I found a great recipe for you! Here's what I suggest:",
        recipe: {
          title: "Quick Veggie Pasta",
          ingredients: [
            "200g pasta",
            "2 cups mixed vegetables",
            "3 cloves garlic",
            "Olive oil",
            "Salt and pepper",
          ],
          steps: [
            "Boil pasta according to package instructions",
            "Sauté garlic in olive oil until fragrant",
            "Add vegetables and cook until tender",
            "Toss with pasta and season to taste",
          ],
        },
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleReset = () => {
    if (!previewMode) {
      setMessages([]);
      setInput("");
      setSelectedChips([]);
    }
  };

  const toggleChip = (value: string) => {
    if (previewMode) return;
    setSelectedChips((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <motion.div 
      className="flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-3xl border border-white/30 shadow-glow"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-lg">Your AI Sous-Chef</h3>
          <p className="text-xs text-muted-foreground">Ready to create something delicious</p>
        </div>
        {!previewMode && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px]">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-chat-user-bg text-chat-user-fg"
                    : "bg-chat-bot-bg text-chat-bot-fg"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {message.recipe && (
                  <div className="mt-3 space-y-2">
                    <h4 className="font-semibold">{message.recipe.title}</h4>
                    
                    <div>
                      <p className="text-xs font-medium mb-1">Ingredients:</p>
                      <ul className="text-xs space-y-1">
                        {message.recipe.ingredients.map((ing, i) => (
                          <li key={i}>• {ing}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium mb-1">Steps:</p>
                      <ol className="text-xs space-y-1">
                        {message.recipe.steps.map((step, i) => (
                          <li key={i}>{i + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-chat-bot-bg text-chat-bot-fg rounded-lg p-3">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                />
              </div>
            </div>
          </motion.div>
        )}

        {!previewMode && messages.length > 0 && messages[messages.length - 1]?.role === "bot" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2"
          >
            {quickReplies.map((reply) => (
              <Badge
                key={reply}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setInput(reply)}
              >
                {reply}
              </Badge>
            ))}
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          {quickChips.map((chip) => (
            <Badge
              key={chip.value}
              variant={selectedChips.includes(chip.value) ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => toggleChip(chip.value)}
            >
              {chip.label}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => !previewMode && setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={previewMode ? "This is a preview..." : "Tell me what's in your pantry..."}
            className="min-h-[60px] resize-none"
            disabled={previewMode}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping || previewMode}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
