
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "purple";
}

const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  const colorClasses = {
    blue: "bg-blue-500 text-blue-600 bg-blue-50",
    green: "bg-green-500 text-green-600 bg-green-50",
    orange: "bg-orange-500 text-orange-600 bg-orange-50",
    purple: "bg-purple-500 text-purple-600 bg-purple-50"
  };

  const iconBg = colorClasses[color].split(' ')[0];
  const textColor = colorClasses[color].split(' ')[1];
  const cardBg = colorClasses[color].split(' ')[2];

  return (
    <Card className={`${cardBg} border-${color}-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${textColor} mb-1`}>
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
          </div>
          <div className={`${iconBg} p-3 rounded-full`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
