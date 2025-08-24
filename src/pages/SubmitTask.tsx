import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { Plus, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const taskCategories = [
  "Content Creation",
  "Bug Report", 
  "Research",
  "Development",
  "Design",
  "Documentation",
  "Testing",
  "Marketing"
];

const SubmitTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    attachments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Task Submitted Successfully!",
        description: "Your task has been submitted for admin review. You'll be notified once it's reviewed.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        attachments: []
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-card-foreground">Submit New Task</h1>
          <p className="text-muted-foreground text-lg">
            Submit your work for review and earn points upon approval
          </p>
        </div>

        {/* Submission Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Task Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Task Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your task"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  required
                  className="w-full"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about your task, including what was accomplished, methodology used, and any relevant details..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="attachments" className="text-sm font-medium">
                  Attachments (Optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop files here, or click to browse
                  </p>
                  <input
                    type="file"
                    id="attachments"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('attachments')?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Point Information */}
              <div className="bg-gradient-card rounded-lg p-4 border">
                <h3 className="font-semibold text-card-foreground mb-2">Point Rewards</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>• Content Creation: 30-50 points</p>
                  <p>• Bug Reports: 15-25 points</p>
                  <p>• Research Tasks: 20-40 points</p>
                  <p>• Development: 40-60 points</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-200"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Submit Task
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SubmitTask;