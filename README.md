# Folder organization

### Based on clean architecture

#### The project is using nextjs,typescript,tailwind and zustand for state management

### browser folder contain code related to zustand

`-public
-src
    - adapters
        - api-adapter.ts
    - core
        - browser
            -actions
            -shopping.ts
            -user.ts
            useRoot.ts
        - domains
            -logic
            -models
                - shopping
                - user
    - infrastructure
        -api
            -client
                -shopping
                -user
    - pages
    - presentation
        - components
        - ui
    - ports
        -api.ts
-test`
