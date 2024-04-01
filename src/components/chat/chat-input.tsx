import { LoaderCircle, Send, Trash, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ChangeEvent } from "react";

type ChatInputProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
};

export function ChatInput({ isLoading, file, setFile }: ChatInputProps) {
  function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
    const uploadFile = e.target.files?.[0];
    setFile(uploadFile || null);
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Textarea
        className="rounded bg-transparent text-xs resize-none shadow-sm"
        placeholder="Ask me something..."
        name="user-question"
        disabled={!!file || isLoading}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <label
            htmlFor="fileUpload"
            className="flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
          >
            <span className="text-xs">File</span> <Upload size={16} />
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              name="file-upload"
              onChange={handleUploadFile}
            />
          </label>
          {file && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-800">{file.name}</span>
              <button
                className="outline-none bg-transparent"
                onClick={() => setFile(null)}
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>
        <Button
          size={"sm"}
          disabled={isLoading}
          type="submit"
          className="flex items-center gap-2"
        >
          <span className="text-xs">Send</span>
          {isLoading ? (
            <LoaderCircle size={12} className="animate-spin" />
          ) : (
            <Send size={12} />
          )}
        </Button>
      </div>
    </div>
  );
}
