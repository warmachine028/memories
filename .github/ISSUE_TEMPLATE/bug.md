name: 🐛 Bug Bounty Hunter
description: Report an bug to help improve the project!
labels: ["🛠 goal: fix", "good first issue", "🤩 Up for the grab", "help wanted", "enhancement", "bug"]
body:
  - type: textarea
    id: description
    attributes:
      label: Description
      description: A brief description of the question or issue, also include what you tried and what didn't work
      placeholder: Enter your description
    validations:
      required: true
  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: Screenshots to support replication of Bug
      placeholder: Please attach screenshots if applicable
    validations:
      required: false
  - type: textarea
    id: extrainfo
    attributes:
      label: Additional information
      description: Is there anything else we should know about this bug?
      value: |
        - Maintain Folder Structure
        - Always use styled componets and MUI components instead of plain CSS.
        ## **Make sure to read the [CONTRIBUTING](https://github.com/warmachine028/uemcrp/blob/main/CONTRIBUTING.md) and [SETUP](https://github.com/warmachine028/uemcrp/tree/main/rules) docs before proceeding**
        ## Happy contributing. 💐
        Star my other Repositories [here](https://github.com/warmachine028)
    validations:
      required: false
  - type: markdown
    attributes:
      value: |
        ## **Make sure to read the [CONTRIBUTING](https://github.com/warmachine028/uemcrp/blob/main/CONTRIBUTING.md) and [SETUP](https://github.com/warmachine028/uemcrp/tree/main/rules) docs before proceeding**
        ## Happy contributing. 💐
        Star my other Repositories [here](https://github.com/warmachine028)
