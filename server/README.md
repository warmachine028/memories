# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:5000/ with your browser to see the result.

### Prisma
To start the Prisma studio run:
```bash
bun run prisma studio
```

### ERD

```mermaid
---
config:
  theme: neo-dark
---
erDiagram
    User {
        String id PK
        String firstName
        String lastName
        String email
        String bio
        String imageUrl
        DateTime createdAt
        DateTime updatedAt
    }
    Post {
        String id PK
        String title
        String description
        String imageUrl
        Visibility visibility
        String authorId FK
        Json reactionCounts
        DateTime createdAt
        DateTime updatedAt
    }
    Tag {
        String id PK
        String name
    }
    PostTag {
        String postId PK,FK
        String tagId PK,FK
    }
    Comment {
        String id PK
        String content
        Int likeCount
        String postId FK
        String authorId FK
        DateTime createdAt
        DateTime updatedAt
    }
    PostReaction {
        String userId PK,FK
        String postId PK,FK
        ReactionType reactionType
        DateTime createdAt
    }
    CommentLike {
        String userId PK,FK
        String commentId PK,FK
        DateTime createdAt
    }
    User ||--o{ Post : "authors"
    User ||--o{ Comment : "writes"
    User ||--o{ PostReaction : "reacts to"
    User ||--o{ CommentLike : "likes"
    Post ||--o{ Comment : "has"
    Post ||--o{ PostReaction : "receives"
    Post ||--o{ PostTag : "has"
    Tag ||--o{ PostTag : "belongs to"
    Comment ||--o{ CommentLike : "receives"

```