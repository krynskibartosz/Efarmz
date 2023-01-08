# Folder organization

## Based on clean architecture

#### The project is using nextjs,typescript,tailwind and zustand for state management

### Folder and files naming convention

    - kebab-case for ports and adapters
    - prefix mod_ for interfaces and types
    - PascalCase for components
    - camelCase for all other folders and files

### Folder architecture

<!--
README.md
-__test__
    - mocks
        - product.ts
        - user.ts
    - unit
        - shopping
            - http.test.ts
            - product.test.ts
        - user
            - actions.test.ts
-public
-src
    - adapters
        - shopping-api-adapter.ts
        - user-api-adapter.ts
    - core
        - usecases
            - shopping
                -actions.ts
            - user
                -actions.ts
        - domains
            -logic
                - mod_language.ts
                - checkout.ts
                - user.ts
            -models
                - shopping
                    - catalog
                        - category
                            -  mod_category.ts
                        - product
                            - by-category
                                - mod_products-response.ts
                            - mod_product-response.ts
                            - mod_product-sotre.ts
                            - mod_product.ts
                        mod_checkout.ts
                - user
                    -schema
                        - mod_deliveryOptions.ts
                    mod_user.ts
    - infrastructure
        -api
            -client
                -shopping
                    - catalog
                        - category.ts
                        - product.ts
                -user
                    - user.ts
    - libraries
        - array.ts
        - date.ts
    - pages
        - shopping
            - checkout.tsx
            - catalog
                - [product-category]
                    - index.tsx
    - presentation
        - components
            - home
                - ProductShow.tsx
            - layouts
                - Footer.tsx
                - Header.tsx
            - shopping
                - catalog
                    - category
                        - SubNavbar.tsx
                    - product
                        - ProductCard.tsx
                        - ProductContainer.tsx
                    - checkout
                        - receipt
                            - CommandResume.tsx
                            - index.tsx
                            - logic.ts
                        - shopping-cart
                            - logic.ts
                            - ProductCart.tsx
                            - ShoppingCart.tsx
                            - ShoppingCartItems.tsx
                    - ProductShow.tsx
                    - index.ts
            - user
                - delivery
                    - DeliveryOptionsModal.tsx
                - index.tsx
        - global-state
            -actions
            -shopping.ts
            -user.ts
            -useRoot.ts
        - hooks
            - services
                - shopping
                    - useFetchItemsByProductCategory.tsx
                    - useFetchProducts.tsx
                    - useFetchProductsCategory.tsx
                - user
                    - useFetchUserDeliveryDate.tsx
            - index.ts
            - useEventListener.ts
            - useHasHydrated.ts
            - useIsomorphicLayoutEffect.ts
            - useKeyPress.ts
            - useLockedBody.ts
            - useMediaQuery.ts
            - useModal.ts
            - useUpdateEffect.ts
        - ui
    - ports
        - shopping-port.ts
        - user-port.ts
