export type ResourceFilter<T> = {
    [P in keyof T]?: T[P];
} 
