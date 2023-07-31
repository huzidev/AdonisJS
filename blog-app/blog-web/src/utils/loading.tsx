import ContentLoader from "react-content-loader";

export function LoadingList() {
  return (
    <div>
      <ContentLoader
        speed={1.8}
        width={1200}
        height={220}
        viewBox="0 0 1200 220"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="15" y="15" rx="5" ry="5" width="1220" height="25" />
        <rect x="15" y="55" rx="5" ry="5" width="1220" height="25" />
        <rect x="15" y="95" rx="5" ry="5" width="1220" height="25" />
        <rect x="15" y="135" rx="5" ry="5" width="1220" height="25" />
        <rect x="15" y="175" rx="5" ry="5" width="1220" height="25" />
      </ContentLoader>
    </div>
  );
}
