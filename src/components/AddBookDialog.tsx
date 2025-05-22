
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BookPlus } from "lucide-react";

interface AddBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: any) => void;
}

const AddBookDialog = ({ isOpen, onClose, onAddBook }: AddBookDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishedYear: "",
    description: "",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
  });

  const categories = ["Fiction", "Science Fiction", "Romance", "Fantasy", "Mystery", "Biography", "History", "Science", "Self-Help"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.author || !formData.isbn || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    // Add the book
    onAddBook({
      ...formData,
      publishedYear: parseInt(formData.publishedYear) || new Date().getFullYear()
    });

    // Reset form and close dialog
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      publishedYear: "",
      description: "",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-blue-700">
            <BookPlus className="h-5 w-5" />
            <span>Add New Book</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Book Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter book title"
                className="border-blue-200 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium text-gray-700">
                Author *
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
                className="border-blue-200 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isbn" className="text-sm font-medium text-gray-700">
                ISBN *
              </Label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleInputChange("isbn", e.target.value)}
                placeholder="978-0-123456-78-9"
                className="border-blue-200 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publishedYear" className="text-sm font-medium text-gray-700">
                Published Year
              </Label>
              <Input
                id="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={(e) => handleInputChange("publishedYear", e.target.value)}
                placeholder="2024"
                min="1000"
                max={new Date().getFullYear()}
                className="border-blue-200 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-sm font-medium text-gray-700">
              Cover Image URL
            </Label>
            <Input
              id="cover"
              value={formData.cover}
              onChange={(e) => handleInputChange("cover", e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="border-blue-200 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter book description..."
              className="border-blue-200 focus:ring-blue-500 min-h-[80px]"
              rows={3}
            />
          </div>

          <DialogFooter className="space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <BookPlus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookDialog;
