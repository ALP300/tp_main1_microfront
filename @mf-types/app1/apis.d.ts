
    export type RemoteKeys = 'app1/Header' | 'app1/Footer' | 'app1/Home';
    type PackageType<T> = T extends 'app1/Home' ? typeof import('app1/Home') :T extends 'app1/Footer' ? typeof import('app1/Footer') :T extends 'app1/Header' ? typeof import('app1/Header') :any;