type BreadcrumbProps = {
  breadcrumb: string[];
  onBack: () => void;
};

// Breadcrumb component to display nav history
function Breadcrumb({ breadcrumb, onBack }: BreadcrumbProps) {
  return (
    <div className="mb-4">
      {breadcrumb.length > 1 && (
        <button onClick={onBack} className="text-blue-500 hover:underline mb-2">
          Back
        </button>
      )}
      <nav>
        {breadcrumb.map((crumb, index) => (
          <span key={index}>
            {index > 0 && ' / '}
            {crumb}
          </span>
        ))}
      </nav>
    </div>
  );
}

export default Breadcrumb;