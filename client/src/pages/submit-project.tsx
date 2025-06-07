import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { insertProjectSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { Category } from "@shared/schema";
import type { z } from "zod";

type FormData = z.infer<typeof insertProjectSchema>;

export default function SubmitProject() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      developer: "",
      imageUrl: "",
      externalUrl: "",
      githubUrl: "",
      categoryId: 1,
      tags: [],
    },
  });

  const submitMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      toast({
        title: "Project submitted successfully!",
        description:
          "Your project has been submitted for review and will appear in the directory once approved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      tags: [...customTags],
    };
    submitMutation.mutate(finalData);
  };

  const addTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCustomTags(customTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-venice-warm text-venice-text">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/directory">
          <Button
            variant="ghost"
            className="mb-8 text-venice-light hover:text-venice-text"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Directory
          </Button>
        </Link>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-3xl font-bold text-venice-text">
              Submit Your Venice.ai Application
            </CardTitle>
            <CardDescription className="text-venice-light text-lg">
              Share your innovative application built with Venice.ai's private
              AI API with the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-venice-text font-semibold">
                          Application Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="My Awesome AI App"
                            className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="developer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-venice-text font-semibold">
                          Developer Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-venice-text font-semibold">
                        Short Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="A brief one-line description of your app..."
                          className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-venice-light">
                        This will be shown in the project cards and search
                        results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-venice-text font-semibold">
                        Detailed Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of your application, its features, and how it uses Venice.ai's API..."
                          className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F] min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-venice-light">
                        Explain what your app does, its key features, and how it
                        leverages Venice.ai.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-venice-text font-semibold">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel className="text-venice-text font-semibold">
                    Tags
                  </FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customTags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gray-100 text-venice-text flex items-center gap-1"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent text-venice-light hover:text-venice-text"
                          onClick={() => removeTag(tag)}
                        >
                          <X size={12} />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription className="text-venice-light">
                    Add relevant tags to help users discover your application.
                  </FormDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-venice-text font-semibold">
                          Screenshot URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/screenshot.png"
                            className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-venice-light">
                          URL to a screenshot or preview image of your app.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="externalUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-venice-text font-semibold">
                          Live Demo URL (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourapp.com"
                            className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription className="text-venice-light">
                          Link to your live application.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-venice-text font-semibold">
                        GitHub Repository (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          className="bg-white border-gray-300 text-venice-text focus:border-[#E85A4F] focus:ring-[#E85A4F]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription className="text-venice-light">
                        Link to your source code repository.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-venice-text mb-3">
                    Submission Guidelines
                  </h3>
                  <ul className="text-sm text-venice-light space-y-2">
                    <li>• Your application must use Venice.ai's API</li>
                    <li>• Provide accurate and honest descriptions</li>
                    <li>
                      • Include working screenshots and demo links when possible
                    </li>
                    <li>
                      • All submissions are reviewed before being published
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-[#E85A4F] hover:bg-[#E85A4F]/90 text-white font-semibold py-4 text-lg"
                >
                  {submitMutation.isPending
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
