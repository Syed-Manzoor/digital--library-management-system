
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Calendar, Hash } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: string;
  publishedYear: number;
  description: string;
  cover: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const isAvailable = book.status === "Available";

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-blue-100 overflow-hidden">
      <div className="relative">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={isAvailable ? "default" : "destructive"}
            className={isAvailable ? "bg-green-600" : "bg-red-600"}
          >
            {book.status}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-white/90 text-blue-800 border-blue-200">
            {book.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2 text-blue-500" />
          <span>{book.author}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          <span>{book.publishedYear}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Hash className="h-4 w-4 mr-2 text-blue-500" />
          <span className="font-mono">{book.isbn}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {book.description}
        </p>
        
        <div className="pt-2 space-y-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!isAvailable}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {isAvailable ? "Borrow Book" : "Currently Borrowed"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
