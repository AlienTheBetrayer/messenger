# 🔐 Advanced Authentication Architecture

A robust, type-safe full-stack authentication system built with modern architectural patterns.

---

## 🗺️ Table of Contents

### 🛠️ Functionality

- [0.1 Login & Signup](#01-login--signup)
- [0.2 Verification](#02-verification)
- [0.3 User creation](#03-user-creation)
- [0.4 Sessions](#04-sessions)
- [0.5 Session Editing](#05-session-editing)
- [0.6 OAuth](#06-oauth)

### 🔄 Redux

- [1.1 Optimistic instant UX](#11-optimistic-instant-ux)
- [1.2 Cache normalization](#12-cache-normalization)
- [1.3 Entity adapters](#13-entity-adapters)
- [1.4 SSR Hydration](#14-ssr-hydration)
- [1.5 Prefetching](#15-prefetching)

### 🌐 Type-safe URL

- [2.1 Fragment API](#21-fragment-api)
- [2.2 Query State API](#22-query-state-api)
- [2.3 Popovers](#23-popovers)
- [2.4 Navigation](#24-navigation)

### 🎨 UI

- [3.1 Shadcn](#31-shadcn)
- [3.2 Ripple](#32-ripple)
- [3.3 Tailwind](#33-tailwind)
- [3.4 Themes](#34-themes)
- [3.5 Notifications](#35-notifications)
- [3.6 useForm validation](#36-useform-validation)

### ⚙️ Backend

- [4.1 Guards](#41-guards)
- [4.2 Access token automatic refreshing](#42-access-token-automatic-refreshing)
- [4.3 Jest tests](#43-jest-tests)
- [4.4 Filters](#44-filters)
- [4.5 Interceptors](#45-interceptors)
- [4.6 Redirect metadata](#46-redirect-metadata)
- [4.7 Decorators](#47-decorators)
- [4.8 Prisma](#48-prisma)
- [4.9 Parsing](#49-parsing)
- [4.10 DTOs](#410-dtos)

### 🤝 Shared

- [5.1 Zod schemas](#51-zod-schemas)
- [5.2 Derived types](#52-derived-types)

---

## 🛠️ Functionality

### 0.1 Login & Signup

![login form](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality1.png)

### 0.2 Verification

![verification form](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality2.png)

Any authentication action except the OAuth requires a code verification via E-mail.

### 0.3 User creation

![created user pfp](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality3.png)

Upon signing up (standard/OAuth) a new user gets created with a random color and a random identicon.

### 0.4 Sessions

![auth sessions](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality4.png)

You can add multiple accounts into one session and re-login between them. Relogging as an owner requires additional verification.

### 0.5 Session Editing

![session editing emojis](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality5.png)

Owner of the session can edit the title or any emoji.

### 0.6 OAuth

![oauth services](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/functionality/functionality6.png)

Authentication using services such as Google, Github, Discord. (can easily add more)

---

## 🔄 Redux

### 1.1 Optimistic instant UX

![optimistic ux code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/redux/redux1.png)

API Slices fetch the data then propagate it into other slices.

### 1.2 Cache normalization

![normalization slice code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/redux/redux2.png)

### 1.3 Entity adapters

![entity adapter code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/redux/redux3.png)

### 1.4 SSR Hydration

![pre-hydration coming from ssr](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/redux/redux4.png)

Pre-hydrating the Redux store from the SSR component. (instant auth)

### 1.5 Prefetching

![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/redux/redux5.png)

Prefetching is used on hover/pointerDown events to speed up fetching.

---

## 🌐 Type-safe URL

### 2.1 Fragment API

![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/typesafe/typesafe1.png)
![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/typesafe/typesafe11.png)

Fragment class API along with a hook that allows for smooth type-safe URL change.

### 2.2 Query State API

![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/typesafe/typesafe2.png)

Type-safe query state that allows manipulating multiple query states.

### 2.3 Popovers

![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/typesafe/typesafe3.png)

Fragments and query states allow popovers to use URL as state.

### 2.4 Navigation

![prefetching](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/typesafe/typesafe4.png)

Fragments and query states are easily navigated with back and forward buttons.

---

## 🎨 UI

### 3.1 Shadcn

![shadcn components](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui1.png)

Modified shadcn components.

### 3.2 Ripple

![ripple](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui2.png)

Custom ripple effect upon pointer down events for any element.

### 3.3 Tailwind

### 3.4 Themes

![light theme](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui4.png)
![high contrast](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui44.png)
![dark cool](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui444.png)
![dark warm](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui4444.png)

A variety of light and dark themes, inlcuding system and high contrast themes.

### 3.5 Notifications

![loading notification](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui55.png)
![success notification](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui5.png)

Notification API to show notifications, regular notifications and promise wrapping. (wrap Redux functions)

### 3.6 useForm validation

![form validation with zod](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/ui/ui6.png)

Zod validating the react form.

---

## ⚙️ Backend

### 4.1 Guards

![guards](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend1.png)

Guards are used everywhere in the backend to ensure smooth pipelines. They also hydrate the decorators.

### 4.2 Access token automatic refreshing

![access token refresh](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend2.png)

Access token is automatically refreshed upon requests if the refresh token is present.

### 4.3 Jest tests

![jest tests code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend3.png)

Jest tests are used everywhere to ensure correct code.

### 4.4 Filters

![filters code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend4.png)

### 4.5 Interceptors

![interecptors code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend5.png)

### 4.6 Redirect metadata

![metadata code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend6.png)

Attaching this metadata will redirect upon either success or failure.

### 4.7 Decorators

![decorators code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend7.png)

Decorators can be used everywhere after guards to easily get the request data.

### 4.8 Prisma

![prisma code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend8.png)

Prisma ORM is used extensively to connect with the database.

### 4.9 Parsing

![parsing code](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend9.png)

Type-safe request body custom class to retrieve data.

### 4.10 DTOs

![dtos coming from shared zod schemas](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/backend/backend10.png)

DTOs generated from Zod schemas coming from the shared package.

---

## 🤝 Shared

### 5.1 Zod schemas

![shared zod schemas](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/shared/shared1.png)

### 5.2 Derived types

![derived types in FE](https://raw.githubusercontent.com/AlienTheBetrayer/messenger/refs/heads/main/readme/shared/shared2.png)

Frontend derived types that are also type-safe and correct.
