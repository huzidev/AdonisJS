

interface AppRoute {
  exact?: boolean;
  path: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}

export const routes: AppRoute[] = [
    {
        exact: true,
        
    }
]