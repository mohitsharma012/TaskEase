import Link from "next/link";
import { Github, Twitter, Mail, Code2, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t text-black bg-white/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              TaskEase
            </h3>
            
          </div>
         
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4">
              <a href="https://www.mohitcodes.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="https://github.com/mohitsharma012" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWrRqjCFMCWThRrxdBsJvFFlgbDglQqrLhmCsmtqBRZFCqFDwlkLBxdbSBBrRvZbsLXmTJbgl" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4" />
              <span>Developed by Mohit Sharma</span>
            </div>
          </div>
        </div>
        <div className=" text-center text-xs text-muted-foreground">
          <p>© 2024 TaskEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}