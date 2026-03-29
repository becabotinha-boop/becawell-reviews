import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50">
    <div className="container py-16">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">B</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">BecaWell</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Independent, data-driven product reviews you can trust. No hype, just analysis.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Categories</h4>
          <ul className="space-y-2.5">
            {["Supplements", "Fitness", "Beauty", "Kitchen", "Sleep"].map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
          <ul className="space-y-2.5">
            {["About", "Methodology", "Contact", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Stay Updated</h4>
          <p className="text-sm text-muted-foreground">Get our top picks delivered weekly.</p>
          <div className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BecaWell Reviews. All rights reserved. Some links may earn us a commission.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
