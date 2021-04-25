# JS Sitediff

## packages

- minimist
- minimist-options
- normalize-url
- commist
- cli-columns
- chalk
- axios
- diff

## pipeline

- host  ->
- path ->
- fetch ->
- parse ->
- extract ->
- process ->
- store ->
- compare ->
- write

## Execution

CLI -> API -> Handler

- CLI:
    - parse command
    - load config
    - apply options
    - call API
- API:
    - load default callbacks if necessary
    - load config if necessary
    - call handler
- Handler:
    - execute the action