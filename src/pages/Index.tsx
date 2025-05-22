
import { useState } from "react";
import { Book, Users, BookOpen, Search, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookCard from "@/components/BookCard";
import AddBookDialog from "@/components/AddBookDialog";
import StatsCard from "@/components/StatsCard";

// Sample book data for demonstration
const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    status: "Available",
    publishedYear: 1925,
    description: "A classic American novel about the Jazz Age and the American Dream.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    status: "Borrowed",
    publishedYear: 1960,
    description: "A gripping tale of racial injustice and childhood innocence.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Science Fiction",
    status: "Available",
    publishedYear: 1949,
    description: "A dystopian social science fiction novel about totalitarian control.",
    cover: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    status: "Available",
    publishedYear: 1813,
    description: "A romantic novel of manners set in Georgian England.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Fiction",
    status: "Borrowed",
    publishedYear: 1951,
    description: "A controversial novel about teenage rebellion and alienation.",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0-439-70818-8",
    category: "Fantasy",
    status: "Available",
    publishedYear: 1997,
    description: "The first book in the magical Harry Potter series.",
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop"
  }
];

const Index = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  // Filter books based on search term and category
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ["All", ...new Set(books.map(book => book.category))];

  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === "Available").length;
  const borrowedBooks = books.filter(book => book.status === "Borrowed").length;

  const addNewBook = (bookData: any) => {
    const newBook = {
      ...bookData,
      id: books.length + 1,
      status: "Available"
    };
    setBooks([...books, newBook]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddBookOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Books"
            value={totalBooks}
            icon={Book}
            color="blue"
          />
          <StatsCard
            title="Available Books"
            value={availableBooks}
            icon={BookOpen}
            color="green"
          />
          <StatsCard
            title="Borrowed Books"
            value={borrowedBooks}
            icon={Users}
            color="orange"
          />
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search & Filter Books</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-blue-200 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedCategory === category 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "hover:bg-blue-50 border-blue-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <Card className="text-center py-16 border-dashed border-2 border-blue-200">
            <CardContent>
              <BookOpen className="h-16 w-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your search or filters" 
                  : "Start by adding your first book to the library"
                }
              </p>
              <Button 
                onClick={() => setIsAddBookOpen(true)}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Book
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Book Dialog */}
      <AddBookDialog 
        isOpen={isAddBookOpen}
        onClose={() => setIsAddBookOpen(false)}
        onAddBook={addNewBook}
      />
    </div>
  );
};

export default Index;
