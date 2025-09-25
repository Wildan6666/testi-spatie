// Components/ui/ActionButton.jsx
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/Components/Tooltip";

export default function ActionButton({ icon: Icon, tooltip, onClick, variant = "outline", className = "" }) {
  return (
    <Tooltip text={tooltip}>
      <Button
        size="icon"
        variant={variant}
        onClick={onClick}
        className={className}
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Tooltip>
  );
}
