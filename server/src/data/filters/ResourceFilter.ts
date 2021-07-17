import Resource from "../Resource"

export type ResourceFilter<T extends Resource> = {
    [P in keyof T]?: T[P];
} 
