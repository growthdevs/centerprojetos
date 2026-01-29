import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ContactRequest } from "@/data/mockContactRequests";

interface ContactRequestCardProps {
  request: ContactRequest;
  onClick: () => void;
}

const ContactRequestCard = ({ request, onClick }: ContactRequestCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Card
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-accent/50 ${
        !request.isRead ? "border-l-4 border-l-accent bg-accent/5" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {request.clientName}
            </h3>
            {!request.isRead && (
              <Badge variant="default" className="text-xs px-1.5 py-0.5 bg-accent">
                Nova
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {request.message}
          </p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
          {formatDate(request.createdAt)}
        </span>
      </div>
    </Card>
  );
};

export default ContactRequestCard;
