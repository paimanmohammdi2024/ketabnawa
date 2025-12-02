export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
      <p className="text-muted-foreground">در حال بارگذاری...</p>
    </div>
  );
}
