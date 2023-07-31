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

export function LoadingListBlogs() {
  return (
    <div>
      <ContentLoader
        speed={1.8}
        width={1550}
        height={220}
        viewBox="0 0 1550 220"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="15" y="15" rx="5" ry="5" width="1450" height="25" />
        <rect x="15" y="55" rx="5" ry="5" width="1450" height="25" />
        <rect x="15" y="95" rx="5" ry="5" width="1450" height="25" />
        <rect x="15" y="135" rx="5" ry="5" width="1450" height="25" />
        <rect x="15" y="175" rx="5" ry="5" width="1450" height="25" />
      </ContentLoader>
    </div>
  );
}

// export function LoadingBlogs() {
//   return (
//     <div>
//       <ContentLoader viewBox="0 0 1400 750" height={750} width={1200} >
//         <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
//         <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
//         <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
//         <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
//         <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
//         <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
//         {/*  */}
//         <rect x="755" y="60" rx="0" ry="0" width="650" height="200" />
//         {/*  */}
//         <rect x="755" y="270" rx="0" ry="0" width="200" height="15" />
//         {/*  */}
//         <rect x="755" y="295" rx="0" ry="0" width="140" height="15" />
//         <rect x="30" y="320" rx="0" ry="0" width="200" height="120" />
//         <rect x="30" y="450" rx="0" ry="0" width="200" height="15" />
//         <rect x="30" y="474" rx="0" ry="0" width="140" height="15" />
//         <rect x="243" y="320" rx="0" ry="0" width="200" height="120" />
//         {/*  */}
//         <rect x="755" y="420" rx="0" ry="0" width="650" height="200" />
//         <rect x="243" y="450" rx="0" ry="0" width="200" height="15" />
//         {/*  */}
//         <rect x="755" y="630" rx="0" ry="0" width="200" height="15" />
//         <rect x="243" y="474" rx="0" ry="0" width="140" height="15" />
//         {/*  */}
//         <rect x="755" y="655" rx="0" ry="0" width="140" height="15" /> 
//       </ContentLoader>
//     </div>
//   );
// }
