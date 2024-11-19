# Contribution Guidelines

Welcome to the project! Please follow these rules to ensure smooth collaboration.

## Styling

- Project currently uses data-themes for theme switching that can be found in globals.css.
- Please do not add or remove any colors to project that aren't inside those data-themes!
- Px usage is very little mostly for borders and border radius; other than that, use rems!
- One rem is 10px, do not change its value!

## Supabase data fetching

- to fetch and render data from suapbase use hooks located in utils/supabaseUtils.ts
- see example how to do it in app/[lang]/static

## initial cloning

- to start working on project contributors must clone dev branch( not the master one!)

## github issues / Branching Strategy

- each contributor will have their tasks inside github issues page
- they should assing themselves to their tasks
- github issues related branches are alreaady created and ready to use
- they should change working branch into related brand and push commits there

## Commit Messages

- Use descriptive commit messages:

  - ✅ `Add login feature`
  - ❌ `Fixed stuff`
    feat: A new feature for the user.
  - use relevant prefixes

    Example: feat(auth): add login functionality
    When to use: When you add a new feature, like a new page, new functionality, or an improvement.
    fix: A bug fix.

    Example: fix(auth): fix login issue with empty fields
    When to use: When you fix a bug or issue in the code.
    chore: Routine tasks or maintenance that doesn’t affect the functionality.

    Example: chore: update dependencies
    When to use: For tasks like updating libraries, changing configuration files, or minor internal code cleanups.
    docs: Documentation changes.

    Example: docs(readme): update setup instructions
    When to use: For changes to the documentation, like README files or comments.
    style: Code style changes (e.g., formatting, indentation) that do not affect functionality.

    Example: style(header): fix indentation
    When to use: For changes that don’t affect functionality but improve code style or readability.
    refactor: Refactoring existing code without changing its functionality.

    Example: refactor(auth): improve validation logic
    When to use: For code refactoring that improves the structure or performance of the code without changing its behavior.
    test: Adding or updating tests.

    Example: test(auth): add unit tests for login
    When to use: When you add or update tests, or modify test-related code.
    perf: Performance improvements.

    Example: perf(api): optimize query performance
    When to use: For changes that improve the performance of the application.
    build: Changes to the build system or external dependencies.

    Example: build: add webpack config for production
    When to use: For changes related to the build process, packaging, or deployment.
    ci: Continuous integration-related changes.

    Example: ci: update GitHub Actions workflow
    When to use: For changes that affect your CI/CD pipeline or automated build tools.
    breaking change: If a commit introduces a change that breaks backward compatibility.

    Example: feat(auth): remove support for old authentication methods (breaking change)
    When to use: If the commit introduces a breaking change that requires changes in the way users interact with your code or API.

## Pull Request Process

1. Create a pull request to the `dev` branch.
2. make a review for pull request.
3. Request at least one team member for a code review.
4. Team reviews the PR and merges it into dev.
5. When the task is complete, close the GitHub issue.

## Communication

- Use Teams for exta communication.
- Add detailed comments in your code if implementing complex logic.

Thank you for contributing!
